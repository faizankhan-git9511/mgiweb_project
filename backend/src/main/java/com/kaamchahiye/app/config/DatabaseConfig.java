package com.kaamchahiye.app.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import javax.sql.DataSource;
import java.net.URI;
import java.net.URISyntaxException;

@Configuration
@Profile("postgres")
public class DatabaseConfig {

    @Bean
    public DataSource dataSource() {
        String databaseUrl = System.getenv("DATABASE_URL");
        HikariConfig config = new HikariConfig();

        if (databaseUrl != null && !databaseUrl.trim().isEmpty()) {
            try {
                // Convert Render's postgres:// or postgresql:// URI into JDBC format
                String normalizedUrl = databaseUrl.trim();
                if (normalizedUrl.startsWith("postgres://")) {
                    normalizedUrl = normalizedUrl.replace("postgres://", "postgresql://");
                }

                URI dbUri = new URI(normalizedUrl);
                String username = "";
                String password = "";

                if (dbUri.getUserInfo() != null) {
                    String[] userInfo = dbUri.getUserInfo().split(":", 2);
                    username = userInfo[0];
                    if (userInfo.length > 1) {
                        password = userInfo[1];
                    }
                }

                int port = dbUri.getPort() > 0 ? dbUri.getPort() : 5432;
                String dbPath = dbUri.getPath();
                if (dbPath != null && dbPath.startsWith("/")) {
                    dbPath = dbPath.substring(1);
                }

                String jdbcUrl = String.format("jdbc:postgresql://%s:%d/%s", dbUri.getHost(), port, dbPath);
                if (dbUri.getQuery() != null && !dbUri.getQuery().isEmpty()) {
                    jdbcUrl += "?" + dbUri.getQuery();
                }

                config.setJdbcUrl(jdbcUrl);
                config.setUsername(username);
                config.setPassword(password);
                config.setDriverClassName("org.postgresql.Driver");
            } catch (URISyntaxException e) {
                throw new IllegalArgumentException("Invalid DATABASE_URL environment variable format: " + databaseUrl, e);
            }
        } else {
            // Fallback to JDBC_DATABASE_URL or local defaults
            String jdbcUrl = System.getenv("JDBC_DATABASE_URL");
            if (jdbcUrl == null || jdbcUrl.trim().isEmpty()) {
                jdbcUrl = "jdbc:postgresql://localhost:5432/kaamchahiye";
            }
            config.setJdbcUrl(jdbcUrl);
            config.setUsername(System.getenv("DATABASE_USERNAME") != null ? System.getenv("DATABASE_USERNAME") : "postgres");
            config.setPassword(System.getenv("DATABASE_PASSWORD") != null ? System.getenv("DATABASE_PASSWORD") : "postgres");
            config.setDriverClassName("org.postgresql.Driver");
        }

        return new HikariDataSource(config);
    }
}

package com.kaamchahiye.app.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import javax.sql.DataSource;

@Configuration
@Profile("postgres")
public class DatabaseConfig {

    private static final Logger logger = LoggerFactory.getLogger(DatabaseConfig.class);

    @Bean
    public DataSource dataSource() {
        String databaseUrl = System.getenv("DATABASE_URL");
        if (databaseUrl == null || databaseUrl.trim().isEmpty()) {
            databaseUrl = System.getenv("INTERNAL_DATABASE_URL");
        }
        if (databaseUrl == null || databaseUrl.trim().isEmpty()) {
            databaseUrl = System.getenv("JDBC_DATABASE_URL");
        }
        if (databaseUrl == null || databaseUrl.trim().isEmpty()) {
            databaseUrl = System.getenv("SPRING_DATASOURCE_URL");
        }

        HikariConfig config = new HikariConfig();

        if (databaseUrl != null && !databaseUrl.trim().isEmpty()) {
            logger.info("Configuring PostgreSQL DataSource from environment variable.");
            configureHikariFromUrl(config, databaseUrl.trim());
        } else {
            boolean isRender = System.getenv("RENDER") != null || System.getenv("RENDER_SERVICE_ID") != null;
            if (isRender) {
                throw new IllegalStateException(
                    "SPRING_PROFILES_ACTIVE is set to 'postgres', but neither DATABASE_URL nor INTERNAL_DATABASE_URL " +
                    "environment variable is configured on Render. Please go to your Render Web Service dashboard -> " +
                    "Environment -> Add Environment Variable -> Key: DATABASE_URL, Value: <Your Render PostgreSQL Internal Connection String> " +
                    "(e.g., postgres://user:password@dpg-xxx-a:5432/kaamchahiye)."
                );
            }

            logger.warn("No DATABASE_URL found in environment. Falling back to default localhost:5432/kaamchahiye.");
            config.setJdbcUrl("jdbc:postgresql://localhost:5432/kaamchahiye");
            config.setUsername(System.getenv("DATABASE_USERNAME") != null ? System.getenv("DATABASE_USERNAME") : "postgres");
            config.setPassword(System.getenv("DATABASE_PASSWORD") != null ? System.getenv("DATABASE_PASSWORD") : "postgres");
            config.setDriverClassName("org.postgresql.Driver");
        }

        return new HikariDataSource(config);
    }

    private void configureHikariFromUrl(HikariConfig config, String url) {
        config.setDriverClassName("org.postgresql.Driver");

        if (url.startsWith("jdbc:")) {
            config.setJdbcUrl(url);
            return;
        }

        String cleanUrl = url;
        if (cleanUrl.startsWith("postgres://")) {
            cleanUrl = cleanUrl.substring("postgres://".length());
        } else if (cleanUrl.startsWith("postgresql://")) {
            cleanUrl = cleanUrl.substring("postgresql://".length());
        }

        String username = "";
        String password = "";
        String hostAndPath = cleanUrl;

        int lastAtIdx = cleanUrl.lastIndexOf('@');
        if (lastAtIdx != -1) {
            String userInfo = cleanUrl.substring(0, lastAtIdx);
            hostAndPath = cleanUrl.substring(lastAtIdx + 1);

            int firstColonIdx = userInfo.indexOf(':');
            if (firstColonIdx != -1) {
                username = userInfo.substring(0, firstColonIdx);
                password = userInfo.substring(firstColonIdx + 1);
            } else {
                username = userInfo;
            }
        }

        String hostPort = hostAndPath;
        String dbAndQuery = "";

        int firstSlashIdx = hostAndPath.indexOf('/');
        if (firstSlashIdx != -1) {
            hostPort = hostAndPath.substring(0, firstSlashIdx);
            dbAndQuery = hostAndPath.substring(firstSlashIdx + 1);
        }

        String host = hostPort;
        int port = 5432;
        int colonIdx = hostPort.lastIndexOf(':');
        if (colonIdx != -1) {
            host = hostPort.substring(0, colonIdx);
            try {
                port = Integer.parseInt(hostPort.substring(colonIdx + 1));
            } catch (NumberFormatException ignored) {
                port = 5432;
            }
        }

        String dbName = dbAndQuery;
        String queryParams = "";
        int questionIdx = dbAndQuery.indexOf('?');
        if (questionIdx != -1) {
            dbName = dbAndQuery.substring(0, questionIdx);
            queryParams = dbAndQuery.substring(questionIdx + 1);
        }

        String jdbcUrl = String.format("jdbc:postgresql://%s:%d/%s", host, port, dbName);
        if (!queryParams.isEmpty()) {
            jdbcUrl += "?" + queryParams;
        }

        logger.info("Resolved JDBC URL for PostgreSQL host: {}:{}", host, port);
        config.setJdbcUrl(jdbcUrl);
        if (!username.isEmpty()) {
            config.setUsername(username);
        }
        if (!password.isEmpty()) {
            config.setPassword(password);
        }
    }
}

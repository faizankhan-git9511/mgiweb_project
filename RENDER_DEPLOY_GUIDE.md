# 🚀 Render Deployment Guide for KaamChahiye Full-Stack Project

This guide provides step-by-step instructions to deploy the complete **KaamChahiye** full-stack application (Spring Boot + PostgreSQL + React Vite) on [Render.com](https://render.com).

---

## 🛠️ Project Architecture Overview

- **Backend Service**: Spring Boot 3.2.3 running inside a secure, multi-stage Docker container (`eclipse-temurin:17-jre-alpine`).
- **Database**: Free Managed PostgreSQL Database automatically connected via Render `DATABASE_URL`.
- **Frontend Service**: React 18 + Vite SPA deployed as a Render Static Site with automatic SPA URL rewrites (`/* -> /index.html`).

---

## ⚡ Option 1: 1-Click Render Blueprint Deployment (Recommended)

Render's Infrastructure as Code Blueprint automatically provisions the Database, Backend Container, and Frontend Static Site with zero manual configuration.

### Steps:
1. Push your updated code to your GitHub repository (`https://github.com/faizankhan-git9511/mgiweb_project.git`).
2. Log in to [Render Dashboard](https://dashboard.render.com/).
3. Click **New +** at the top right and select **Blueprint**.
4. Connect your GitHub repository (`mgiweb_project`).
5. Render will detect `render.yaml` and show:
   - 🗄️ **kaamchahiye-db** (Managed PostgreSQL Database)
   - ☕ **kaamchahiye-backend** (Docker Web Service)
   - ⚛️ **kaamchahiye-frontend** (Static Site)
6. Click **Apply**. Render will automatically provision and deploy all 3 services in sequence.

---

## 🛠️ Option 2: Manual Dashboard Creation

If you prefer to configure each service manually via the Render Dashboard:

### 1. Provision Managed PostgreSQL Database
- **Service Type**: PostgreSQL
- **Name**: `kaamchahiye-db`
- **Database Name**: `kaamchahiye`
- **User**: `kaamchahiye_user`
- **Region**: Singapore (or preferred region)
- **Plan**: Free

> 📌 **Note Internal Database URL**: Copy the **Internal Database URL** (e.g. `postgres://kaamchahiye_user:...@dpg-xxxx/kaamchahiye`).

---

### 2. Create Backend Web Service
- **Service Type**: Web Service
- **Name**: `kaamchahiye-backend`
- **Environment**: Docker
- **Docker Command / Context**: Leave default (uses `Dockerfile` at repository root)
- **Health Check Path**: `/api/platform/info`
- **Environment Variables**:
  | Key | Value | Notes |
  |---|---|---|
  | `SPRING_PROFILES_ACTIVE` | `postgres` | Activates PostgreSQL configuration profile |
  | `DATABASE_URL` | `postgres://user:pass@host:port/dbname` | Paste Internal Database URL from Step 1 |
  | `JWT_SECRET` | `YourSuperSecretJWTKeyForKaamChahiye9876543210` | 64+ char secret key |
  | `CORS_ALLOWED_ORIGINS` | `https://kaamchahiye-frontend.onrender.com` | Your frontend Render URL |

---

### 3. Create Frontend Static Site
- **Service Type**: Static Site
- **Name**: `kaamchahiye-frontend`
- **Build Command**: `cd frontend && npm install && npm run build`
- **Publish Directory**: `./frontend/dist`
- **Environment Variables**:
  | Key | Value | Notes |
  |---|---|---|
  | `VITE_API_BASE_URL` | `https://kaamchahiye-backend.onrender.com` | Your backend Render URL |
- **SPA Rewrites Rule** (Under *Redirects/Rewrites* tab):
  - **Source**: `/*`
  - **Destination**: `/index.html`
  - **Action**: `Rewrite`

---

## 🔒 Verification & Health Checks

Once deployed, verify your services:

1. **Backend Health Check**:
   ```bash
   curl https://kaamchahiye-backend.onrender.com/api/platform/info
   ```
   *Response should return platform info and Founder metadata for Faizan Khan.*

2. **Frontend Marketplace**:
   Navigate to `https://kaamchahiye-frontend.onrender.com`.
   - Test Sign In using CEO Demo Credentials (`9999999999` / `password123`).
   - Verify `/about`, `/support`, and `/dashboard/admin` routes load seamlessly on page refresh.

---

## 📝 Troubleshooting & Logs

- **CORS Issues**: Ensure `CORS_ALLOWED_ORIGINS` on the backend matches the exact URL of your frontend.
- **Database Connection**: `DatabaseConfig.java` automatically converts `postgres://` or `postgresql://` URIs injected by Render into standard `jdbc:postgresql://` format.

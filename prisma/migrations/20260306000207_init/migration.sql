-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'ADMIN',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "coverImage" TEXT,
    "images" TEXT NOT NULL DEFAULT '[]',
    "tech" TEXT NOT NULL DEFAULT '[]',
    "liveUrl" TEXT,
    "repoUrl" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ContactMessage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "message" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Setting" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "siteName" TEXT NOT NULL DEFAULT 'Hawk Studio',
    "siteDescription" TEXT NOT NULL DEFAULT 'حلول برمجية احترافية، مواقع وتطبيقات، وتجارب رقمية بهوية سينمائية.',
    "siteUrl" TEXT NOT NULL DEFAULT 'http://localhost:3000',
    "contactPhone" TEXT NOT NULL DEFAULT '+96170000000',
    "contactWhatsApp" TEXT NOT NULL DEFAULT '+96170000000',
    "contactEmail" TEXT NOT NULL DEFAULT 'hello@hawk.studio',
    "maintenanceMode" BOOLEAN NOT NULL DEFAULT false,
    "socialInstagram" TEXT,
    "socialX" TEXT,
    "socialLinkedIn" TEXT,
    "socialGithub" TEXT,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

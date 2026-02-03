-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "planType" TEXT NOT NULL DEFAULT 'BASIC',
    "coupleNames" TEXT NOT NULL,
    "namesLogo" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "heroTitle" TEXT NOT NULL,
    "heroDescription" TEXT NOT NULL,
    "heroBgImage" TEXT NOT NULL,
    "accentColor" TEXT NOT NULL,
    "showSoundtrack" BOOLEAN NOT NULL DEFAULT false,
    "spotifyTrackId" TEXT,
    "soundtrackIntro" TEXT,
    "footerSubtitle" TEXT NOT NULL,
    "footerNames" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoveLetter" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "content" TEXT NOT NULL,
    "farewellPhrase" TEXT NOT NULL,
    "senderName" TEXT NOT NULL,

    CONSTRAINT "LoveLetter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GalleryMoment" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "GalleryMoment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimelineEvent" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "eventDate" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "TimelineEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReasonToLove" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "reasonNumber" TEXT NOT NULL,
    "iconName" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ReasonToLove_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhotoStack" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PhotoStack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FutureVow" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "iconName" TEXT NOT NULL,
    "promiseText" TEXT NOT NULL,
    "keywordValue" TEXT NOT NULL,

    CONSTRAINT "FutureVow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoveBubble" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "revealedText" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "LoveBubble_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "LoveLetter_projectId_key" ON "LoveLetter"("projectId");

-- AddForeignKey
ALTER TABLE "LoveLetter" ADD CONSTRAINT "LoveLetter_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GalleryMoment" ADD CONSTRAINT "GalleryMoment_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimelineEvent" ADD CONSTRAINT "TimelineEvent_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReasonToLove" ADD CONSTRAINT "ReasonToLove_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhotoStack" ADD CONSTRAINT "PhotoStack_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FutureVow" ADD CONSTRAINT "FutureVow_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoveBubble" ADD CONSTRAINT "LoveBubble_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

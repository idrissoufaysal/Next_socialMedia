/*
  Warnings:

  - You are about to alter the column `blockerId` on the `Block` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `blockedId` on the `Block` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `userId` on the `Comment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `senderId` on the `FollowRequest` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `receiverId` on the `FollowRequest` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `followerId` on the `Follower` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `followingId` on the `Follower` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `userId` on the `Like` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `userId` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `userId` on the `Story` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `Block` DROP FOREIGN KEY `Block_blockedId_fkey`;

-- DropForeignKey
ALTER TABLE `Block` DROP FOREIGN KEY `Block_blockerId_fkey`;

-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_userId_fkey`;

-- DropForeignKey
ALTER TABLE `FollowRequest` DROP FOREIGN KEY `FollowRequest_receiverId_fkey`;

-- DropForeignKey
ALTER TABLE `FollowRequest` DROP FOREIGN KEY `FollowRequest_senderId_fkey`;

-- DropForeignKey
ALTER TABLE `Follower` DROP FOREIGN KEY `Follower_followerId_fkey`;

-- DropForeignKey
ALTER TABLE `Follower` DROP FOREIGN KEY `Follower_followingId_fkey`;

-- DropForeignKey
ALTER TABLE `Like` DROP FOREIGN KEY `Like_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Story` DROP FOREIGN KEY `Story_userId_fkey`;

-- DropIndex
DROP INDEX `User_username_key` ON `User`;

-- AlterTable
ALTER TABLE `Block` MODIFY `blockerId` INTEGER NOT NULL,
    MODIFY `blockedId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Comment` MODIFY `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `FollowRequest` MODIFY `senderId` INTEGER NOT NULL,
    MODIFY `receiverId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Follower` MODIFY `followerId` INTEGER NOT NULL,
    MODIFY `followingId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Like` MODIFY `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Post` MODIFY `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Story` MODIFY `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `username` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Follower` ADD CONSTRAINT `Follower_followerId_fkey` FOREIGN KEY (`followerId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Follower` ADD CONSTRAINT `Follower_followingId_fkey` FOREIGN KEY (`followingId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FollowRequest` ADD CONSTRAINT `FollowRequest_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FollowRequest` ADD CONSTRAINT `FollowRequest_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Block` ADD CONSTRAINT `Block_blockerId_fkey` FOREIGN KEY (`blockerId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Block` ADD CONSTRAINT `Block_blockedId_fkey` FOREIGN KEY (`blockedId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Story` ADD CONSTRAINT `Story_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

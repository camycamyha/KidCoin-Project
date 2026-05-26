BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[users] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [role] NVARCHAR(1000) NOT NULL,
    [active] BIT NOT NULL CONSTRAINT [users_active_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [users_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [schoolId] NVARCHAR(1000),
    CONSTRAINT [users_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [users_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[schools] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [cnpj] NVARCHAR(1000),
    [active] BIT NOT NULL CONSTRAINT [schools_active_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [schools_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [schools_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [schools_cnpj_key] UNIQUE NONCLUSTERED ([cnpj])
);

-- CreateTable
CREATE TABLE [dbo].[teacher_profiles] (
    [id] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [teacher_profiles_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [teacher_profiles_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [teacher_profiles_userId_key] UNIQUE NONCLUSTERED ([userId])
);

-- CreateTable
CREATE TABLE [dbo].[student_profiles] (
    [id] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [avatarUrl] NVARCHAR(1000),
    [totalCoins] INT NOT NULL CONSTRAINT [student_profiles_totalCoins_df] DEFAULT 0,
    [totalXp] INT NOT NULL CONSTRAINT [student_profiles_totalXp_df] DEFAULT 0,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [student_profiles_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [student_profiles_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [student_profiles_userId_key] UNIQUE NONCLUSTERED ([userId])
);

-- CreateTable
CREATE TABLE [dbo].[classrooms] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000),
    [code] NVARCHAR(1000) NOT NULL,
    [active] BIT NOT NULL CONSTRAINT [classrooms_active_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [classrooms_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [schoolId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [classrooms_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [classrooms_code_key] UNIQUE NONCLUSTERED ([code])
);

-- CreateTable
CREATE TABLE [dbo].[classroom_teachers] (
    [classroomId] NVARCHAR(1000) NOT NULL,
    [teacherId] NVARCHAR(1000) NOT NULL,
    [assignedAt] DATETIME2 NOT NULL CONSTRAINT [classroom_teachers_assignedAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [classroom_teachers_pkey] PRIMARY KEY CLUSTERED ([classroomId],[teacherId])
);

-- CreateTable
CREATE TABLE [dbo].[classroom_students] (
    [classroomId] NVARCHAR(1000) NOT NULL,
    [studentId] NVARCHAR(1000) NOT NULL,
    [enrolledAt] DATETIME2 NOT NULL CONSTRAINT [classroom_students_enrolledAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [classroom_students_pkey] PRIMARY KEY CLUSTERED ([classroomId],[studentId])
);

-- CreateTable
CREATE TABLE [dbo].[activities] (
    [id] NVARCHAR(1000) NOT NULL,
    [title] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000),
    [coinReward] INT NOT NULL CONSTRAINT [activities_coinReward_df] DEFAULT 10,
    [xpReward] INT NOT NULL CONSTRAINT [activities_xpReward_df] DEFAULT 50,
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [activities_status_df] DEFAULT 'DRAFT',
    [dueDate] DATETIME2,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [activities_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [classroomId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [activities_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[questions] (
    [id] NVARCHAR(1000) NOT NULL,
    [activityId] NVARCHAR(1000) NOT NULL,
    [order] INT NOT NULL,
    [text] NVARCHAR(1000) NOT NULL,
    [options] NVARCHAR(1000) NOT NULL,
    [answer] NVARCHAR(1000) NOT NULL,
    [explanation] NVARCHAR(1000),
    CONSTRAINT [questions_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[submissions] (
    [id] NVARCHAR(1000) NOT NULL,
    [studentId] NVARCHAR(1000) NOT NULL,
    [activityId] NVARCHAR(1000) NOT NULL,
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [submissions_status_df] DEFAULT 'PENDING',
    [score] INT,
    [coinsEarned] INT NOT NULL CONSTRAINT [submissions_coinsEarned_df] DEFAULT 0,
    [xpEarned] INT NOT NULL CONSTRAINT [submissions_xpEarned_df] DEFAULT 0,
    [submittedAt] DATETIME2,
    [gradedAt] DATETIME2,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [submissions_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [submissions_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [submissions_studentId_activityId_key] UNIQUE NONCLUSTERED ([studentId],[activityId])
);

-- CreateTable
CREATE TABLE [dbo].[answers] (
    [id] NVARCHAR(1000) NOT NULL,
    [submissionId] NVARCHAR(1000) NOT NULL,
    [questionId] NVARCHAR(1000) NOT NULL,
    [selected] NVARCHAR(1000) NOT NULL,
    [isCorrect] BIT NOT NULL CONSTRAINT [answers_isCorrect_df] DEFAULT 0,
    CONSTRAINT [answers_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[coin_transactions] (
    [id] NVARCHAR(1000) NOT NULL,
    [studentId] NVARCHAR(1000) NOT NULL,
    [amount] INT NOT NULL,
    [description] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [coin_transactions_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [coin_transactions_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[shop_items] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000),
    [imageUrl] NVARCHAR(1000),
    [price] INT NOT NULL,
    [category] NVARCHAR(1000) NOT NULL,
    [active] BIT NOT NULL CONSTRAINT [shop_items_active_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [shop_items_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [shop_items_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[purchases] (
    [id] NVARCHAR(1000) NOT NULL,
    [studentId] NVARCHAR(1000) NOT NULL,
    [itemId] NVARCHAR(1000) NOT NULL,
    [pricePaid] INT NOT NULL,
    [boughtAt] DATETIME2 NOT NULL CONSTRAINT [purchases_boughtAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [purchases_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[users] ADD CONSTRAINT [users_schoolId_fkey] FOREIGN KEY ([schoolId]) REFERENCES [dbo].[schools]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[teacher_profiles] ADD CONSTRAINT [teacher_profiles_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[student_profiles] ADD CONSTRAINT [student_profiles_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[classrooms] ADD CONSTRAINT [classrooms_schoolId_fkey] FOREIGN KEY ([schoolId]) REFERENCES [dbo].[schools]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[classroom_teachers] ADD CONSTRAINT [classroom_teachers_classroomId_fkey] FOREIGN KEY ([classroomId]) REFERENCES [dbo].[classrooms]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[classroom_teachers] ADD CONSTRAINT [classroom_teachers_teacherId_fkey] FOREIGN KEY ([teacherId]) REFERENCES [dbo].[teacher_profiles]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[classroom_students] ADD CONSTRAINT [classroom_students_classroomId_fkey] FOREIGN KEY ([classroomId]) REFERENCES [dbo].[classrooms]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[classroom_students] ADD CONSTRAINT [classroom_students_studentId_fkey] FOREIGN KEY ([studentId]) REFERENCES [dbo].[student_profiles]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[activities] ADD CONSTRAINT [activities_classroomId_fkey] FOREIGN KEY ([classroomId]) REFERENCES [dbo].[classrooms]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[questions] ADD CONSTRAINT [questions_activityId_fkey] FOREIGN KEY ([activityId]) REFERENCES [dbo].[activities]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[submissions] ADD CONSTRAINT [submissions_studentId_fkey] FOREIGN KEY ([studentId]) REFERENCES [dbo].[student_profiles]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[submissions] ADD CONSTRAINT [submissions_activityId_fkey] FOREIGN KEY ([activityId]) REFERENCES [dbo].[activities]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[answers] ADD CONSTRAINT [answers_submissionId_fkey] FOREIGN KEY ([submissionId]) REFERENCES [dbo].[submissions]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[answers] ADD CONSTRAINT [answers_questionId_fkey] FOREIGN KEY ([questionId]) REFERENCES [dbo].[questions]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[coin_transactions] ADD CONSTRAINT [coin_transactions_studentId_fkey] FOREIGN KEY ([studentId]) REFERENCES [dbo].[student_profiles]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[purchases] ADD CONSTRAINT [purchases_studentId_fkey] FOREIGN KEY ([studentId]) REFERENCES [dbo].[student_profiles]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[purchases] ADD CONSTRAINT [purchases_itemId_fkey] FOREIGN KEY ([itemId]) REFERENCES [dbo].[shop_items]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

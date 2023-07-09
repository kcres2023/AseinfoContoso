--CREAAR BASE DE DATOS
--Create Database ContosoUniversityData
--GO

USE ContosoUniversityData
GO

CREATE TABLE [dbo].[Student] (
    [StudentID]      INT           IDENTITY (1, 1) NOT NULL,
    [LastName]       NVARCHAR (50) NULL,
    [FirstName]      NVARCHAR (50) NULL,
    [EnrollmentDate] DATETIME      NULL,
    PRIMARY KEY CLUSTERED ([StudentID] ASC)
)
Go

CREATE TABLE [dbo].[Course] (
    [CourseID] INT           IDENTITY (1, 1) NOT NULL,
    [Title]    NVARCHAR (50) NULL,
    [Credits]  INT           NULL,
    PRIMARY KEY CLUSTERED ([CourseID] ASC)
)
Go

CREATE TABLE [dbo].[Grade] (
    GradeID INT           IDENTITY (1, 1) NOT NULL,
    Grado    DECIMAL(3, 2) NULL,
    Descripcion   NVARCHAR (50) NULL,
    PRIMARY KEY CLUSTERED (GradeID ASC)
)
Go

Drop table [dbo].[Enrollment]
go

CREATE TABLE [dbo].[Enrollment] (
    [EnrollmentID] INT IDENTITY (1, 1) NOT NULL,
    [GradeID]        INT,
    [CourseID]     INT NOT NULL,
    [StudentID]    INT NOT NULL,
    PRIMARY KEY CLUSTERED ([EnrollmentID] ASC),
    CONSTRAINT [FK_dbo.Enrollment_dbo.Course_CourseID] FOREIGN KEY ([CourseID]) 
        REFERENCES [dbo].[Course] ([CourseID]) ON DELETE CASCADE,
    CONSTRAINT [FK_dbo.Enrollment_dbo.Student_StudentID] FOREIGN KEY ([StudentID]) 
        REFERENCES [dbo].[Student] ([StudentID]) ON DELETE CASCADE
)
Go


--Alter Table [dbo].[Enrollment]
--add constraint FK_Enrollment_Grade_GradeID
--  foreign key (GradeID)
--  references [dbo].[Grade](GradeID);


MERGE INTO Course AS Target 
USING (VALUES 
        (1, 'Economics', 3), 
        (2, 'Literature', 3), 
        (3, 'Chemistry', 4)
) 
AS Source (CourseID, Title, Credits) 
ON Target.CourseID = Source.CourseID 
WHEN NOT MATCHED BY TARGET THEN 
INSERT (Title, Credits) 
VALUES (Title, Credits);

MERGE INTO Student AS Target
USING (VALUES 
        (1, 'Tibbetts', 'Donnie', '2013-09-01'), 
        (2, 'Guzman', 'Liza', '2012-01-13'), 
(3, 'Catlett', 'Phil', '2011-09-03')
)
AS Source (StudentID, LastName, FirstName, EnrollmentDate)
ON Target.StudentID = Source.StudentID
WHEN NOT MATCHED BY TARGET THEN
INSERT (LastName, FirstName, EnrollmentDate)
VALUES (LastName, FirstName, EnrollmentDate);

MERGE INTO Grade AS Target
USING (VALUES 
        (1, 2.00, 'Grado 2'), 
        (2, 3.50, 'Grado 3.5'), 
		(3, 4.00, 'Grado 4.0'),
		(4, 1.80, 'Grado 1.8'),
		(5, 3.20, 'Grado 1.8')
)
AS Source (GradeID, Grado, Descripcion)
ON Target.GradeID = Source.GradeID
WHEN NOT MATCHED BY TARGET THEN
INSERT (Grado, Descripcion)
VALUES (Grado, Descripcion);

MERGE INTO Enrollment AS Target
USING (VALUES 
(1, 1, 1, 1),
(2, 2, 1, 2),
(3, 3, 2, 3),
(4, 4, 2, 1),
(5, 5, 3, 1),
(6, 3, 3, 2)
)
AS Source (EnrollmentID, GradeID, CourseID, StudentID)
ON Target.EnrollmentID = Source.EnrollmentID
WHEN NOT MATCHED BY TARGET THEN
INSERT (GradeID, CourseID, StudentID)
VALUES (GradeID, CourseID, StudentID);


Alter Table dbo.Student
Add MiddleName  NVARCHAR(50) NULL


--Select * From [dbo].[Enrollment]
--Select * From  [dbo].[Course] 
--Select * from [dbo].[Student]

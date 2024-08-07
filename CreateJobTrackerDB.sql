USE [JobSearchTracker]
GO

ALTER TABLE [dbo].[Job] DROP CONSTRAINT [FK_JobID_NotficationID]
GO

/****** Object:  Table [dbo].[Job]    Script Date: 8/6/2024 10:51:57 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Job]') AND type in (N'U'))
DROP TABLE [dbo].[Job]
GO

/****** Object:  Table [dbo].[Job]    Script Date: 8/6/2024 10:51:57 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Job](
	[JobID] [int] IDENTITY(1,1) NOT NULL,
	[JobNumber] [int] NOT NULL,
	[JobTitle] [varchar](255) NOT NULL,
	[JobLocation] [varchar](255) NOT NULL,
	[RecruiterName] [varchar](255) NOT NULL,
	[ClientCompanyContactName] [varchar](255) NULL,
	[RecruiterCompanyName] [varchar](255) NOT NULL,
	[ClientCompanyName] [varchar](255) NOT NULL,
	[RecruiterPhoneNumber] [varchar](255) NULL,
	[RecruiterCompanyPhoneNumber] [varchar](255) NOT NULL,
	[ClientCompanyPhoneNumber] [varchar](255) NULL,
	[RecruiterCompanyLocation] [varchar](255) NOT NULL,
	[ClientCompanyLocation] [varchar](255) NOT NULL,
	[RecruiterNotes] [varchar](1024) NULL,
	[ClientNotes] [varchar](1024) NULL,
	[JobDescription] [varchar](1024) NOT NULL,
	[DateOfSubmission] [datetime] NOT NULL,
	[DateOfFollowUp] [datetime] NULL,
	[DateOfInterview] [datetime] NULL,
	[FK_JobID_NotficationID] [int] NULL,
	[NotificationID] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[JobID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Notification]    Script Date: 8/6/2024 10:47:25 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Notification]') AND type in (N'U'))
DROP TABLE [dbo].[Notification]
GO

/****** Object:  Table [dbo].[Notification]    Script Date: 8/6/2024 10:47:25 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Notification](
	[NotificationID] [int] IDENTITY(1,1) NOT NULL,
	[NotificationNumber] [int] NOT NULL,
	[RecruiterName] [varchar](255) NOT NULL,
	[RecruiterCompanyName] [varchar](255) NOT NULL,
	[RecruiterCompanyLocation] [varchar](255) NOT NULL,
	[RecruiterPhoneNumber] [varchar](255) NULL,
	[RecruiterCompanyPhoneNumber] [varchar](255) NOT NULL,
	[ClientContactName] [varchar](255) NULL,
	[ClientCompanyName] [varchar](255) NOT NULL,
	[ClientCompanyLocation] [varchar](255) NOT NULL,
	[ClientCompanyPhoneNumber] [varchar](255) NULL,
	[NotificationDate] [datetime] NOT NULL,
	[NotificationEvent] [int] NOT NULL,
	[Message] [nchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[NotificationID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO





ALTER TABLE [dbo].[Job]  WITH NOCHECK ADD  CONSTRAINT [FK_JobID_NotficationID] FOREIGN KEY([FK_JobID_NotficationID])
REFERENCES [dbo].[Notification] ([NotificationID])
GO

ALTER TABLE [dbo].[Job] CHECK CONSTRAINT [FK_JobID_NotficationID]
GO



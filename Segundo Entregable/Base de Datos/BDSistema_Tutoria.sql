USE MASTER
GO

/* ********************************************************************
					    CREACIÓN DE LA BASE DE DATOS
   ******************************************************************** */
IF EXISTS (SELECT * 
				FROM SYSDATABASES
				WHERE NAME = 'BDSistema_Tutoria')
	DROP DATABASE BDSistema_Tutoria
GO
CREATE DATABASE BDSistema_Tutoria
GO

-- Crear tipos de datos para las claves primarias
USE BDSistema_Tutoria
	EXEC SP_ADDTYPE tyCodEstudiante,	'VARCHAR(6)', 'NOT NULL'
	EXEC SP_ADDTYPE tyCodEstudianteAyudante,	'VARCHAR(6)', 'NOT NULL'
	EXEC SP_ADDTYPE tyCodEstudianteRA,	'VARCHAR(6)', 'NOT NULL'
	EXEC SP_ADDTYPE tyCodDocente,		'VARCHAR(7)', 'NOT NULL'
	EXEC SP_ADDTYPE tyCodTutor,		'VARCHAR(7)', 'NOT NULL'
	EXEC SP_ADDTYPE tyCodCoordinadorTutoria,		'VARCHAR(7)', 'NOT NULL'
	EXEC SP_ADDTYPE tyCodTaller,		'VARCHAR(10)', 'NOT NULL'
	EXEC SP_ADDTYPE tyCodInforme,		'VARCHAR(10)', 'NOT NULL'
	EXEC SP_ADDTYPE tyCodFicha,		'VARCHAR(10)', 'NOT NULL'
	EXEC SP_ADDTYPE tyIdCaso,		'VARCHAR(10)', 'NOT NULL'
	EXEC SP_ADDTYPE tyIdTipoCaso,		'VARCHAR(10)', 'NOT NULL'
	EXEC SP_ADDTYPE tyIdInformeSemestral, 'VARCHAR(10)', 'NOT NULL'
	EXEC SP_ADDTYPE tyCodInformeQuincenal, 'VARCHAR(10)', 'NOT NULL'
GO 

/* ********************************************************************
					        CREACIÓN DE TABLAS
   ******************************************************************** */
USE BDSistema_Tutoria
GO

/* *************************** TABLA DOCENTE *************************** */
IF EXISTS (SELECT * 
				FROM SYSOBJECTS
				WHERE NAME = 'TDocente')
	DROP TABLE TDocente
GO
CREATE TABLE TDocente
(
	-- Lista de atributos
	CodDocente tyCodDocente,
	Nombres VARCHAR(30) NOT NULL,
	ApPaterno VARCHAR(15) NOT NULL,
	ApMaterno VARCHAR(15) NOT NULL,
	Categoria VARCHAR(15) NOT NULL,
	Email VARCHAR(50) NOT NULL,
	Direccion VARCHAR(50) NOT NULL,

	-- Determinar las claves 
	PRIMARY KEY (CodDocente)
);
GO

/* *************************** TABLA ESTUDIANTE *************************** */
IF EXISTS (SELECT * 
				FROM SYSOBJECTS
				WHERE NAME = 'TEstudiante')
	DROP TABLE TEstudiante
GO
CREATE TABLE TEstudiante
(
	-- Lista de atributos
	CodEstudiante tyCodEstudiante,
	Nombres VARCHAR(30) NOT NULL,
	ApPaterno VARCHAR(15) NOT NULL,
	ApMaterno VARCHAR(15) NOT NULL,
	Email VARCHAR(50) NOT NULL,
	Direccion VARCHAR(50) NOT NULL,
	Celular VARCHAR(9) NOT NULL,

	-- Determinar las claves 
	PRIMARY KEY (CodEstudiante)
);
GO

/* *************************** TABLA TUTOR *************************** */
IF EXISTS (SELECT * 
				FROM SYSOBJECTS
				WHERE NAME = 'TTutor')
	DROP TABLE TTutor
GO
CREATE TABLE TTutor
(
	-- Lista de atributos
	CodTutor tyCodTutor,
	CodDocente tyCodDocente,
	CantidadTutorandos int,
	Semestre VARCHAR(10) NOT NULL, 

	-- Determinar las claves 
	PRIMARY KEY (CodTutor),
	FOREIGN KEY (CodDocente) REFERENCES TDocente
);
GO

/* *************************** TABLA COORDINADOR TUTORIA *************************** */
IF EXISTS (SELECT * 
				FROM SYSOBJECTS
				WHERE NAME = 'TCoordinadorTutoria')
	DROP TABLE TCoordinadorTutoria
GO
CREATE TABLE TCoordinadorTutoria
(
	-- Lista de atributos
	CodCoordinadorTutoria tyCodCoordinadorTutoria,
	CodTutor tyCodTutor

	-- Determinar las claves 
	PRIMARY KEY (CodCoordinadorTutoria),
	FOREIGN KEY (CodTutor) REFERENCES TTutor
);
GO

/* *************************** TABLA ESTUDIANTE AYUDANTE *************************** */
IF EXISTS (SELECT * 
				FROM SYSOBJECTS
				WHERE NAME = 'TEstudianteAyudante')
	DROP TABLE TEstudianteAyudante
GO
CREATE TABLE TEstudianteAyudante
(
	-- Lista de atributos
	CodEstudianteAyudante tyCodEstudianteAyudante,
	CodEstudiante tyCodEstudiante,
	SemestreEleccion VARCHAR(10) NOT NULL,
	Asignatura VARCHAR(15) NOT NULL,
	NestudiantesaCargo int,

	-- Determinar las claves 
	PRIMARY KEY (CodEstudianteAyudante),
	FOREIGN KEY (CodEstudiante) REFERENCES TEstudiante,
);
GO

/* *************************** TABLA ESTUDIANTE EN RIESGO ACADÉMICO *************************** */
IF EXISTS (SELECT * 
				FROM SYSOBJECTS
				WHERE NAME = 'TEstudianteRA')
	DROP TABLE TEstudianteRA
GO
CREATE TABLE TEstudianteRA
(
	-- Lista de atributos
	CodEstudianteRA tyCodEstudianteRA,
	CodEstudiante tyCodEstudiante,
	Semestre_Observado VARCHAR(10) NOT NULL,
	NroCursosDesaprobados int,
	NroVecesDesaprobadoXCurso int,

	-- Determinar las claves 
	PRIMARY KEY (CodEstudianteRA),
	FOREIGN KEY (CodEstudiante) REFERENCES TEstudiante,
);
GO

/* *************************** TABLA TALLERES REFORZAMIENTO *************************** */
IF EXISTS (SELECT * 
				FROM SYSOBJECTS
				WHERE NAME = 'TTalleresReforzamiento')
	DROP TABLE TTalleresReforzamiento
GO
CREATE TABLE TTalleresReforzamiento
(
	-- Lista de atributos
	CodTaller tyCodTaller,
	CodEstudianteAyudante tyCodEstudianteAyudante,
	CodEstudianteRA tyCodEstudianteRA,
	FechaTaller date,
	LugarTaller varchar(50) not null,
	-- Determinar las claves 
	PRIMARY KEY (CodTaller),
	FOREIGN KEY (CodEstudianteRA) REFERENCES TEstudianteRA,
	FOREIGN KEY (CodEstudianteAyudante) REFERENCES TEstudianteAyudante,
);
GO

/* *************************** TABLA INFORME *************************** */
IF EXISTS (SELECT * 
				FROM SYSOBJECTS
				WHERE NAME = 'TInforme')
	DROP TABLE TInforme
GO
CREATE TABLE TInforme
(
	-- Lista de atributos
	CodInforme tyCodInforme,
	Semestre VARCHAR(10) NOT NULL,
	Fecha date,

	-- Determinar las claves 
	PRIMARY KEY (CodInforme)
);
GO

/* *************************** TABLA INFORME SEMESTRAL *************************** */
IF EXISTS (SELECT * 
				FROM SYSOBJECTS
				WHERE NAME = 'TInformeSemestral')
	DROP TABLE TInformeSemestral
GO
CREATE TABLE TInformeSemestral
(
	-- Lista de atributos
	CodInforme tyCodInforme,
	IdInformeSemestral tyIdInformeSemestral,
	CodTutor tyCodTutor,
	NroTutorandos_TuroriasRealizadas_InicioSemestre int NOT NULL,
	NroTutorandos_TuroriasRealizadas_MedioSemestre int NOT NULL,
	NroTutorandos_TuroriasRealizadas_FinalSemestre int NOT NULL,

	-- Determinar las claves 
	PRIMARY KEY (IdInformeSemestral),
	FOREIGN KEY (CodInforme) REFERENCES TInforme,
	FOREIGN KEY (CodTutor) REFERENCES TTutor,
);
GO

/* *************************** TABLA INFORME QUINCENAL *************************** */
IF EXISTS (SELECT * 
				FROM SYSOBJECTS
				WHERE NAME = 'TInformeQuincenal')
	DROP TABLE TInformeQuincenal
GO
CREATE TABLE TInformeQuincenal
(
	-- Lista de atributos
	CodInformeQuincenal tyCodInformeQuincenal,
	CodInforme tyCodInforme,
	CodTutor tyCodTutor,
	CodEstudianteRA tyCodEstudianteRA,
	FechasAsistencia date,
	ConfirmacionAsistencia VARCHAR(10),
	DescripcionesAsistencia VARCHAR(100),
	ResumenReuniones VARCHAR(100),
	Dificultades VARCHAR(50),

	-- Determinar las claves 
	PRIMARY KEY (CodInformeQuincenal),
	FOREIGN KEY (CodInforme) REFERENCES TInforme,
	FOREIGN KEY (CodTutor) REFERENCES TTutor,
	FOREIGN KEY (CodEstudianteRA) REFERENCES TEstudianteRA,
);
GO

/* *************************** TABLA FICHA TUTORIA *************************** */
IF EXISTS (SELECT * 
				FROM SYSOBJECTS
				WHERE NAME = 'TFichaTutoria')
	DROP TABLE TFichaTutoria
GO
CREATE TABLE TFichaTutoria
(
	-- Lista de atributos
	CodTutor tyCodTutor,
	CodEstudiante tyCodEstudiante,
	CelularReferenciaTutorando VARCHAR(9) NOT NULL,
	PersonaReferenciaTutorando VARCHAR(9) NOT NULL,
	Fecha date,
	TipoTutoria varchar(15) not null,
	Descripcion varchar(50) not null,
	Referencia varchar(50) not null,
	Observaciones varchar(100) not null,
	-- Determinar las claves 
	PRIMARY KEY (CodTutor, CodEstudiante),
	FOREIGN KEY (CodEstudiante) REFERENCES TEstudiante,
	FOREIGN KEY (CodTutor) REFERENCES TTutor,
);
GO

/* *************************** TABLA TIPO ESPECIAL *************************** */
IF EXISTS (SELECT * 
				FROM SYSOBJECTS
				WHERE NAME = 'TTipoCaso')
	DROP TABLE TTipoCaso
GO
CREATE TABLE TTipoCaso
(
	-- Lista de atributos
	IdTipoCaso tyIdTipoCaso,
	TipoCaso varchar(15),

	-- Definir la clave primaria
	PRIMARY KEY(IdTipoCaso)	
)
GO

/* *************************** TABLA CASO ESPECIAL *************************** */
IF EXISTS (SELECT * 
				FROM SYSOBJECTS
				WHERE NAME = 'TCasoEspecial')
	DROP TABLE TCasoEspecial
GO
CREATE TABLE TCasoEspecial
(
	-- Lista de atributos
	IdCaso tyIdCaso,
	IdInformeSemestral tyIdInformeSemestral,
	CodEstudiante tyCodEstudiante,
	IdTipoCaso tyIdTipoCaso,

	-- Definir la clave primaria
	PRIMARY KEY(IdCaso, IdInformeSemestral),
	FOREIGN KEY(CodEstudiante) REFERENCES TEstudiante,
	FOREIGN KEY(IdTipoCaso) REFERENCES TTipoCaso,
	FOREIGN KEY(IdInformeSemestral) REFERENCES TInformeSemestral,
)
GO


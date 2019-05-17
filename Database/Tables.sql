/* USUARIOS */
CREATE TABLE Usuarios(
	ID		SERIAL		NOT NULL,
	Nombre		VARCHAR(200)	NOT NULL,
	Correo		VARCHAR(50)	NOT NULL,
	Pass		VARCHAR(50)	NOT NULL,
	CantFunciones	INT		NOT NULL,

	CONSTRAINT PK_ID_Usuarios PRIMARY KEY (ID)	
);

/* FUNCIONES */
CREATE TABLE Funciones(
	ID		SERIAL		NOT NULL,
	ID_Usuario	INT		NOT NULL,
	Nombre		VARCHAR(50)	NOT NULL,
	Descripcion	VARCHAR(200)	NOT NULL,
	CodeJS		VARCHAR(4000)	NOT NULL, -- no tengo idea de que cantidad poner aqui, es mejor crear un archivo y almacenarlo en el servidor xD 
						  -- y luego solo se maneja la referencia mediante direccion del archivo .txt
	VecesUtilizadas	INT		NOT NULL,

	CONSTRAINT PK_ID_Funciones PRIMARY KEY (ID),
	CONSTRAINT FK_ID_Usuario_Funciones FOREIGN KEY (ID_Usuario) REFERENCES Usuarios ON UPDATE CASCADE ON DELETE CASCADE
);

/* ETIQUETAS */
CREATE TABLE Etiquetas(
	ID		SERIAL		NOT NULL,
	Nombre		VARCHAR(200)	NOT NULL,

	CONSTRAINT PK_ID_Etiquetas PRIMARY KEY (ID)	
);

/* TABLA INTERMEDIA ENTRE FUNCION Y ETIQUETAS */
CREATE TABLE Funcion_Etiquetas(
	ID_Funcion		INT	NOT NULL,
	ID_Etiqueta		INT	NOT NULL,

	CONSTRAINT FK_ID_Funcion_Funcion_Etiquetas FOREIGN KEY (ID_Funcion) REFERENCES Funciones ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT FK_ID_Etiqueta_Funcion_Etiquetas FOREIGN KEY (ID_Etiqueta) REFERENCES Etiquetas ON UPDATE CASCADE ON DELETE CASCADE	
);

/* VERSIONES */
CREATE TABLE Versiones( -- supongo que esta tabla tiene ID porque no tiene pinta de ser intermedia
	ID		SERIAL	NOT NULL,
	ID_Funcion	INT	NOT NULL,
	NumVersion	SERIAL	NOT NULL,

	CONSTRAINT PK_ID_Versiones PRIMARY KEY (ID),
	CONSTRAINT FK_ID_Funcion_Versiones FOREIGN KEY (ID_Funcion) REFERENCES Funciones ON UPDATE CASCADE ON DELETE CASCADE	
);

/* DEPENDENCIAS */ -- HAY QUE METER LOS PARAMETROS Y EJECUTARLA
CREATE TABLE Dependencias(
	ID		SERIAL	NOT NULL,

	CONSTRAINT PK_ID_Dependencias PRIMARY KEY (ID)
);

/* DEPENDENCIAS */ -- HAY QUE METER LOS PARAMETROS Y EJECUTARLA
CREATE TABLE Dependencias_Funciones(
	ID_Funcion		INT	NOT NULL,
	ID_Dependencia		INT	NOT NULL,

	CONSTRAINT FK_ID_Funcion_Dependencias_Funciones FOREIGN KEY (ID_Funcion) REFERENCES Funciones ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT FK_ID_Dependencia_Dependencias_Funciones FOREIGN KEY (ID_Dependencia) REFERENCES Dependencias ON UPDATE CASCADE ON DELETE CASCADE
);
CREATE  DATABASE  CinePelicula ;
USE CinePelicula;

-- tabla de películas -- 
CREATE TABLE peliculas(
	peliculaID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	titulo VARCHAR(255) NOT NULL,
	director VARCHAR(80) NOT NULL,
	idioma VARCHAR(255) NOT NULL,
	edadRequerida SMALLINT,
	fechaEstreno DATE,
    duracionMin smallint);

-- tabla de generos -- 
CREATE TABLE generos(
	generoID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	genero VARCHAR(80) NOT NULL);
    
-- tabla de genero x pelicula -- 
CREATE TABLE generosXPelicula(
	generoPeliID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	generoID INT NOT NULL,
	peliculaID INT NOT NULL);
    
-- Agregar --
delimiter $$
CREATE PROCEDURE proceInsertarPelicula (titulo VARCHAR(255), director VARCHAR(80), idioma VARCHAR(255), 
				edadRequerida SMALLINT, fechaEstreno DATE,duracionMin smallint)
begin 
	INSERT INTO `cinePelicula`.`peliculas`
		(`titulo`,`director`,`idioma`,`edadRequerida`,`fechaEstreno`,`duracionMin`)
		VALUES
		(titulo,director,idioma,edadRequerida,fechaEstreno,duracionMin);
    select last_insert_id() as peliculaID;
end $$ 
delimiter ;

delimiter $$
CREATE PROCEDURE proceInsertarGenero (genero VARCHAR(80))
begin 
	INSERT INTO `cinePelicula`.`generos`
		(`genero`)
		VALUES
		(genero);
    select last_insert_id() as generoID;
end $$ 
delimiter ;

delimiter $$
CREATE PROCEDURE proceInsertarGeneroXPelicula (IdPelicula INT, IDGenero INT)
BEGIN 
	INSERT INTO `cinePelicula`.`generosxpelicula`
		(`generoID`,`peliculaID`)
		values
		(IDGenero,IdPelicula);
end $$ 
delimiter ;

-- Eliminar --

-- Modificar --

-- Buscar --

-- PRUEBAS -- 
call proceInsertarPelicula ('Jurassic Park','Colin Trevorrow', 'Ingles', 12,'2018-11-23', 130);
call proceInsertarGenero('Accion');
call proceInsertarGeneroXPelicula(1,1);



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
    FOREIGN KEY (generoID) REFERENCES generos(generoID),
	peliculaID INT NOT NULL,
    FOREIGN KEY (peliculaID) REFERENCES peliculas(peliculaID));
    
    
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
delimiter $$
CREATE PROCEDURE proceEliminarPelicula (pIdPelicula INT)
begin 
	DELETE FROM generosXPelicula WHERE generosXPelicula.peliculaID = pIdPelicula;
	DELETE FROM peliculas WHERE peliculas.peliculaID = pIdPelicula;
    
end $$ 
delimiter ;

-- Modificar --
delimiter $$
CREATE PROCEDURE proceModificarPelicula (pPeliculaID INT, pTitulo VARCHAR(255), pIdioma VARCHAR(255), pFecha DATE)
BEGIN
    IF NOT pTitulo = "" THEN
        UPDATE Peliculas SET titulo = pTitulo WHERE peliculaID = pPeliculaID;
    END IF;
    IF NOT pIdioma = "" THEN
        UPDATE Peliculas SET idioma = pIdioma WHERE peliculaID = pPeliculaID;
    END IF;
    IF NOT pFecha = '1901-01-01' THEN
        UPDATE Peliculas SET fechaEstreno = pFecha WHERE peliculaID = pPeliculaID;
    END IF;
END $$
delimiter ;

-- Buscar --
delimiter $$
CREATE PROCEDURE proceBuscarPelicula (pTitulo VARCHAR(255), IDGenero VARCHAR(80), pIdioma VARCHAR(255), pFecha DATE)
BEGIN
    SET @consulta = 'SELECT PELI.peliculaID, titulo, director, idioma, edadRequerida, fechaEstreno, duracionMin, genero FROM Peliculas PELI INNER JOIN generosxpelicula GePel ON GePel.peliculaID = PELI.peliculaID INNER JOIN Generos ON GePel.generoID = Generos.generoID WHERE 1';   
    IF NOT pTitulo = "" THEN SET @consulta = CONCAT(@consulta, " AND titulo = '", pTitulo, "'"); END IF;
    IF NOT IDGenero = "" THEN SET @consulta = CONCAT(@consulta, " AND genero = '", IDGenero, "'"); END IF;
    IF NOT pIdioma = "" THEN SET @consulta = CONCAT(@consulta, " AND idioma = '", pIdioma, "'"); END IF;
    IF NOT pFecha = '1901-01-01' THEN SET @consulta = CONCAT(@consulta, " AND fechaEstreno = '", DATE_FORMAT(pFecha, '%Y-%m-%d'), "'"); END IF;
    PREPARE stmt FROM @consulta;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END $$
delimiter ;

-- PRUEBAS -- 
call proceInsertarPelicula ('Jurassic Park','Colin Trevorrow', 'Ingles', 12,'2018-11-23', 130);
call proceInsertarPelicula ('Una noche en el museo','Matt Danner', 'Español', 12,'2006-12-22', 108);
call proceInsertarPelicula ('Misterio a la vista','Jeremy Garelick', 'Subtitulada', 12,'2023-03-31', 89);
call proceInsertarPelicula ('MEGAN','Gerard Johnstone', 'Ingles', 12,'2023-01-04', 102);
call proceInsertarPelicula ('Poker Face','Russell Crowe', 'Ingles', 12,'2023-07-11', 120);
call proceInsertarPelicula ('El asombroso Mauricio','Toby Genkel','Español', 3,'2023-03-31', 93);
call proceInsertarPelicula ('Zoe y Tempestad','Christian Duguay','Español', 7,'2022-12-21', 109);
call proceInsertarPelicula ('El libro del amor','Analeine Cal Y Mayor','Ingles', 7,'2023-05-12', 106);
call proceInsertarPelicula ('Momias','Juan Jesús García Galocha','Español', 3,'2023-02-24', 88);
call proceInsertarPelicula ('Megalodón 2: El gran abismo','Ben Wheatley','Español', 12,'2024-08-06', 116);

call proceInsertarGenero('Accion');
call proceInsertarGenero('Drama');
call proceInsertarGenero('Terror');
call proceInsertarGenero('Aventura');
call proceInsertarGenero('Comedia');
call proceInsertarGenero('Animacion');
call proceInsertarGenero('Familiar');
call proceInsertarGenero('Romance');
call proceInsertarGenero('Ciencia Ficcion');

call proceInsertarGeneroXPelicula(1,1);
call proceInsertarGeneroXPelicula(2,4);
call proceInsertarGeneroXPelicula(2,5);
call proceInsertarGeneroXPelicula(3,5);
call proceInsertarGeneroXPelicula(4,3);
call proceInsertarGeneroXPelicula(5,1);
call proceInsertarGeneroXPelicula(6,6);
call proceInsertarGeneroXPelicula(6,7);
call proceInsertarGeneroXPelicula(7,2);
call proceInsertarGeneroXPelicula(8,5);
call proceInsertarGeneroXPelicula(8,8);
call proceInsertarGeneroXPelicula(9,6);
call proceInsertarGeneroXPelicula(9,7);
call proceInsertarGeneroXPelicula(10,9);


call proceBuscarPelicula('','','','1901-01-01');
call proceBuscarPelicula('Jurassic Park','','','1901-01-01');
call proceBuscarPelicula('','','','2006-12-22');
call proceBuscarPelicula('Nuevo titulo','','','1901-01-01');

DROP PROCEDURE `cinepelicula`.`proceBuscarPelicula`;

call proceModificarPelicula(3, 'Nuevo titulo', '', '1901-01-01');
DROP PROCEDURE `cinepelicula`.`proceModificarPelicula`;

call proceEliminarPelicula(1);

select * from generosXPelicula;
select * from peliculas;
select * from generos;

create database 30praum;
use 30praum; 

create table usuario(
id int primary key auto_increment,
nome varchar(50),
email varchar(100) unique,
senha varchar (100)
); 

select * from usuario; 

create table respostas_quiz (
id int primary key auto_increment,
data_hora datetime default current_timestamp,
artista_resultado varchar(20),
p1 varchar(60),
p2 varchar(60),
p3 varchar(60),
p4 varchar(60),
p5 varchar(60),
plataforma varchar(30),
canal varchar(30),
faixa_etaria varchar(20)
);

select * from respostas_quiz;

alter table respostas_quiz
add column usuario_id int null,
add column pontos_matue int default 0,
add column pontos_teto int default 0,
add column pontos_brandao int default 0,
add column pontos_wiu int default 0,
add foreign key (usuario_id) references usuario(id);

SELECT id, artista_resultado, usuario_id, pontos_matue, pontos_teto, pontos_brandao, pontos_wiu
FROM respostas_quiz ORDER BY id DESC LIMIT 3;

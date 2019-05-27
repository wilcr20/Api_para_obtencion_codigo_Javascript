select * from funcion_etiquetas
select id_dependencia from dependencias_funciones

select * from funciones

select * from dependencias_funciones

select * from etiquetas

select f.id, f.nombre from (select * from dependencias_funciones where id_funcion =32) 
as dep

inner join funciones as f on f.id= dep.id_dependencia

select et.id, et.nombre from (select * from funcion_etiquetas where id_funcion =32) 
as dep

inner join etiquetas as et on et.id= dep.id_etiqueta

update funciones set nombre ='sumar' where id =32
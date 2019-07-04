$(document).ready(
    function(){
        let link = $('.link');
        function cambiarRojo(){
            $(this).css({'color':'red','background-color':'yellow', 'font-size':'29px',
        'border-radius': '45%'});
        };
        link.hover(cambiarRojo);

        link.on('mouseout', function(){
            $(this).css({'color':'black', 'background-color': 'inherit', 'font-size':'22px'});
        });

        let order = $('.orderBy');
        order.on('mouseover', function(){
            $(this).css({'background-color':'yellow', 'font-size':'55px'})
        });

        //Cuando pasas el raton por encima
        let border = $('.todo');
        border.on('mousemove', function(){
            $(this).css({'border-radius':'15%', 'border':'3px solid red'});
        });
        // cuando se quita el raton y vuelve a la normalidad
        border.on('mouseout', function(){
            $(this).css({'border-radius':'inherit', 'border':'inherit'});
        });

       let foto = $('.picture');
       foto.on('mousemove', function(){
           $(this).css({'width':'250px', 'height':'250px'})
       })
       





    }
)





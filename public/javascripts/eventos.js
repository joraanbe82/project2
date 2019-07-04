$(document).ready(function() {
  // //Cuando pasas el raton por encima
  // let btnColor = $(".btnSucces");
  // btnColor.on("mouseover", function() {
  //   $(this).css({ "background-color": "#12680a", color: "#ffffff"});
  // });

  // // cuando se quita el raton y vuelve a la normalidad
  // let btnColor = $(".btnSucces");
  // btnColor.on("mouseout", function() {
  //   $(this).css({ "background-color": "#inherit", color: "inherit"});
  // });

  //Cuando pasas el raton por encima
  // let border = $(".todo");
  // border.on("mousemove", function() {
  //   $(this).css({ "border-radius": "15%", border: "3px solid red" });
  // });
  // // cuando se quita el raton y vuelve a la normalidad
  // border.on("mouseout", function() {
  //   $(this).css({ "border-radius": "inherit", border: "inherit" });
  // });

  let foto = $(".picture");
  foto.on("mousemove", function() {
    $(this).css({ width: "250px", height: "250px" });
  });

  for (i = 0; i < 6; i++) {
    $("#check" + [i]).change(function() {
      $(".choice1").text(this.value);
    });
  }

  for (i = 6; i < 11; i++) {
    $("#check" + [i]).change(function() {
      $(".choice2").text(this.value);
    });
  }

  for (i = 11; i < 16; i++) {
    $("#check" + [i]).change(function() {
      $(".choice3").text(this.value);
    });
  }

  for (i = 16; i < 21; i++) {
    $("#check" + [i]).change(function() {
      $(".choice4").text(this.value);
    });
  }

  for (i = 21; i < 26; i++) {
    $("#check" + [i]).change(function() {
      $(".choice5").text(this.value);
    });
  }

  for (i = 26; i < 31; i++) {
    $("#check" + [i]).change(function() {
      $(".choice6").text(this.value);
    });
  }

  for (i = 31; i < 36; i++) {
    $("#check" + [i]).change(function() {
      $(".choice7").text(this.value);
    });
  }

  for (i = 36; i < 41; i++) {
    $("#check" + [i]).change(function() {
      $(".choice8").text(this.value);
    });
  }

  for (i = 41; i < 46; i++) {
    $("#check" + [i]).change(function() {
      $(".choice9").text(this.value);
    });
  }

  for (i = 46; i < 51; i++) {
    $("#check" + [i]).change(function() {
      $(".choice10").text(this.value);
    });
  }
});

// $("input[type='checkbox']").val();

// $('#check_id').val();

// $(':checkbox:checked').each(function(i){
//         val[i] = $(this).val();
//   });

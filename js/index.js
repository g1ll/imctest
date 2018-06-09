$(document).ready(function () {
    var nome, imc, alt, peso;
    var server = 'g1ll.000webhostapp.com';
//	var server = 'localhost';

    $("#res").hide();
    $("#table").hide();
    $("#calc").click(function () {

        $("#res").hide();
        alt = $("#alt").val();
        peso = $("#peso").val();
        imc = peso / (alt * alt);
        $("#res").html("IMC: " + imc.toFixed(2));
        $("#res").slideToggle('slow');

    });

    $('#salvar').click(
            function () {

                nome = prompt('Informe seu nome');
                //ENVIA DADOS PARA O SERVIDOR VIA POST
                $.ajax(
                        {
                            type: 'post',
                            url: 'https://' + server + '/ajaxphp/insere.php',
                            data: {name: nome, altura: alt, peso: peso, imc: imc},
                            dataType: 'html',
                            success: function (data) {
                                $("#res").html("IMC: " + imc + " <br>" + data);
                                //ACESSA DADOS DO SERVIDOR VIA GET
                                $.ajax(
                                        {
                                            type: 'get',
                                            url: 'https://' + server + '/ajaxphp/consulta.php',
                                            dataType: 'JSON',
                                            success: function (data) {
                                                var table = '';
                                                $.each(data, function (i, v) {
                                                    table += '<tr><td>' + v.id + '</td>\n\
                                                            <td>' + v.name + '</td>\n\
                                                            <td>' + parseFloat(v.altura).toFixed(2) + '</td>\n\
                                                            <td>' + parseFloat(v.peso).toFixed(2) + '</td>\n\
                                                            <td>' + parseFloat(v.imc).toFixed(2) + '</td>\n\
                                                            </tr>';
                                                });
                                                $("#table table tbody").html(table);
                                                $("#table").fadeIn('fadein');
                                            },
                                            error: function (data) {
                                                $("#res").html("ERRO:<br>" + data);
                                            }
                                        }
                                );
                            },
                            error: function (data) {
                                $("#res").html("ERRO:<br>" + data);
                            }
                        }
                );

            });
});

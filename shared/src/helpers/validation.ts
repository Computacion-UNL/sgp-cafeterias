/**
 * Function to validate national identity number in Ecuador
 * @param value
 * @returns
 */
export const validateDNI = (value: string) => {
  var suma = 0;
  var residuo = 0;
  var pri = false;
  var pub = false;
  var nat = false;
  var numeroProvincias = 22;
  var modulo = 11;

  /* Verifico que el campo no contenga letras */
  var ok = 1;
  for (let i = 0; i < value.length && ok == 1; i++) {
    var n = parseInt(value.charAt(i));
    if (isNaN(n)) ok = 0;
  }
  if (ok == 0) {
    console.log("No puede ingresar caracteres en el número");
    return false;
  }

  if (value.length < 10) {
    console.log("El número ingresado no es válido");
    return false;
  }

  /* Los primeros dos digitos corresponden al codigo de la provincia */
  let provincia = parseInt(value.substring(0, 2));
  if (provincia < 1 || provincia > numeroProvincias) {
    console.log("El código de la provincia (dos primeros dígitos) es inválido");
    return false;
  }

  /* Aqui almacenamos los digitos de la cedula en variables. */
  let d1 = parseInt(value.substring(0, 1));
  let d2 = parseInt(value.substring(1, 2));
  let d3 = parseInt(value.substring(2, 3));
  let d4 = parseInt(value.substring(3, 4));
  let d5 = parseInt(value.substring(4, 5));
  let d6 = parseInt(value.substring(5, 6));
  let d7 = parseInt(value.substring(6, 7));
  let d8 = parseInt(value.substring(7, 8));
  let d9 = parseInt(value.substring(8, 9));
  let d10 = parseInt(value.substring(9, 10));

  /* El tercer digito es: */
  /* 9 para sociedades privadas y extranjeros   */
  /* 6 para sociedades publicas */
  /* menor que 6 (0,1,2,3,4,5) para personas naturales */

  if (d3 == 7 || d3 == 8) {
    console.log("El tercer dígito ingresado es inválido");
    return false;
  }

  let p1: number = 0,
    p2: number = 0,
    p3: number = 0,
    p4: number = 0,
    p5: number = 0,
    p6: number = 0,
    p7: number = 0,
    p8: number = 0,
    p9: number = 0;
  /* Solo para personas naturales (modulo 10) */
  if (d3 < 6) {
    nat = true;
    p1 = d1 * 2;
    if (p1 >= 10) p1 -= 9;
    p2 = d2 * 1;
    if (p2 >= 10) p2 -= 9;
    p3 = d3 * 2;
    if (p3 >= 10) p3 -= 9;
    p4 = d4 * 1;
    if (p4 >= 10) p4 -= 9;
    p5 = d5 * 2;
    if (p5 >= 10) p5 -= 9;
    p6 = d6 * 1;
    if (p6 >= 10) p6 -= 9;
    p7 = d7 * 2;
    if (p7 >= 10) p7 -= 9;
    p8 = d8 * 1;
    if (p8 >= 10) p8 -= 9;
    p9 = d9 * 2;
    if (p9 >= 10) p9 -= 9;
    modulo = 10;
  } else if (d3 == 6) {
    /* Solo para sociedades publicas (modulo 11) */
    /* Aqui el digito verficador esta en la posicion 9, en las otras 2 en la pos. 10 */
    pub = true;
    p1 = d1 * 3;
    p2 = d2 * 2;
    p3 = d3 * 7;
    p4 = d4 * 6;
    p5 = d5 * 5;
    p6 = d6 * 4;
    p7 = d7 * 3;
    p8 = d8 * 2;
    p9 = 0;
  } else if (d3 == 9) {
    /* Solo para entidades privadas (modulo 11) */
    pri = true;
    p1 = d1 * 4;
    p2 = d2 * 3;
    p3 = d3 * 2;
    p4 = d4 * 7;
    p5 = d5 * 6;
    p6 = d6 * 5;
    p7 = d7 * 4;
    p8 = d8 * 3;
    p9 = d9 * 2;
  }

  suma = p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;
  residuo = suma % modulo;

  /* Si residuo=0, dig.ver.=0, caso contrario 10 - residuo*/
  let digitoVerificador = residuo == 0 ? 0 : modulo - residuo;

  /* ahora comparamos el elemento de la posicion 10 con el dig. ver.*/
  if (pub == true) {
    if (digitoVerificador != d9) {
      console.log("El ruc de la empresa del sector público es incorrecto.");
      return false;
    }
    /* El ruc de las empresas del sector publico terminan con 0001*/
    if (value.substring(9, 13) != "0001") {
      console.log(
        "El ruc de la empresa del sector público debe terminar con 0001"
      );
      return false;
    }
  } else if (pri == true) {
    if (digitoVerificador != d10) {
      console.log("El ruc de la empresa del sector privado es incorrecto.");
      return false;
    }
    if (value.substring(10, 13) != "001") {
      console.log(
        "El ruc de la empresa del sector privado debe terminar con 001"
      );
      return false;
    }
  } else if (nat == true) {
    if (digitoVerificador != d10) {
      console.log("El número de cédula de la persona natural es incorrecto.");
      return false;
    }
    if (value.length > 10 && value.substring(10, 13) != "001") {
      console.log("El ruc de la persona natural debe terminar con 001");
      return false;
    }
  }
  return true;
};

import axios from 'axios';

export const getDatosActa=async({numeroTRA, codigoVerificacion})=>{
    console.log(numeroTRA)
    console.log(codigoVerificacion)

    // const datosActa = await axios.post(
    //   "http://www.bio-residuos.eco-tracer.co:3012/acta",
    //   { numeroTRA, codigoVerificacion }
    // );
    const datosActa = await axios.post("http://localhost:4000/acta", {
      numeroTRA,
      codigoVerificacion,
    });

    return await datosActa.data
    //.then((res)=>{
    //    return res
    // })


}



// TRA19909
// 8240916652428994613330
// http://localhost:3000/TRA9998/73280131977206656018859
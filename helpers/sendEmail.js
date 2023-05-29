import nodemailer from 'nodemailer'

export default async function ({ nombre, email, token }) {
    
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        }
    });

    await transport.sendMail({
        from: "BienesRaices.com",
        to: email,
        subject: "Confirma tu cuenta en bienesRaices.com",
        text: "Confirma tu cuenta en bienesRaices.com",
        html: `
            <p>Hola ${nombre} comprueba tu cuenta en bienesRaizes.com</p>
            <p>Tu cuenta ya esta lista, solo debes confirmarla en ek siguiente enlace:
            <a href='${process.env.URL}:${process.env.PORT}/auth/confirmar/${token}'>Confimar cuenta</a></p>
            <p>Si tu no creaste esta cuenta, ignoara el mensaje<p>
        `
    });



}
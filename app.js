const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const dialogflow = require('dialogflow');

// Configura la conexión a Dialogflow
const projectId = 'TU_PROJECT_ID'; // Reemplaza con tu ID de proyecto de Dialogflow
const sessionId = 'random-session-id'; // Puedes generar un ID de sesión de forma dinámica
const languageCode = 'es'; // El código de idioma de tu preferencia

const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(projectId, sessionId);



const flowSecundario = addKeyword(['gracias', 'siguiente']).addAnswer('de nada')


const flow1 = addKeyword(['1']).addAnswer(
    [
        'Ingresa al *"Cadaver Exquisito Infinito"* pinchando el link:',
        '✨⬇️⬇️⬇️⬇️✨',
        'https://chat.whatsapp.com/L7a26o6BXhSErBnPonWtq5',,
        '*Las instrucciones del grupo de escritura son:*' ,,
        '*1)* Asegúrate de que tengas activado el _texto predictivo_ o _autocompletar_',,
        '*2)* 💥🤖🦾Elige una palabra para empezar tu verso y continúalo utilizando las palabras sugeridas por el texto predictivo!',
        '¡El desafío es lograr algo de coherencia con tus elecciones!',, 
        '*3)* 💡♾️📲Puedes escribir todas las veces que quieras',, 
        '*4)* 🔪❌😝 Si envías un mensaje que no es parte del juego serás eliminado del grupo',,  
        
    
],
null,
null,
[flowSecundario]
)

const flow2 = addKeyword(['2']).addAnswer('Aquí tienes:', null, async (ctx, {flowDynamic}) => {
    let poems = [
        '"Sobre la superficie mojada de esta mesa, que parece un campo de batalla\ndos moscas hacen el amor"',
    
        '"No quiere que la quieran, ni la cuiden, pues se adiestró en el\nconocimiento de la selva y puede llegar a solas a casa de su abuela."',
    
        '"Bien puede el paisaje confundirse con sus elementos\nun mero montaje del ojo desde arriba\nla vera invención de interpretar la imagen"',
    
        '"estar aquí es estar en todas partes y si no es el fin\nes al menos el retorno al río o a algo que se le parece"',

    '"ponerse tacones rojos y estirar las piernas por encima de la cabeza, como\nhacen en mi país\nen mi país que también es triste, en mi país del que me fui sin que me echaran"',
    

'"Poema:   defensa primitiva del consciente"',


'"Soy un toro asustado rogando una muleta\nCon ganas de embestir pero deseando la estocada"',


'"el abecedario\nes para ella un rompecabezas incompleto\nporque la niña no ha olvidado toda esa música\nque aún circula por el aire que respiramos"',

'"Sol ungido de cromato,\ncielo entintado en zafiro;\nguta por el que suspiro,\ncerúleo; don de arrebatos."',


'"porque un pájaro gris vino una noche a buscarte,\ny se desangró por los ojos,\nporque le sostuviste la mirada,\nhasta que, ciego se azotó contra todo lo que podía trizar."',


'"ella tiene ojos de casa sin cortinas\ny la sonrisa de aguarrás"',


'"la niebla nos devora con su hospital tardío\ncon su boca pintada donde perros y trenes vagan sin sentido"',
    
    ]

    let randomIndex = Math.floor(Math.random() * poems.length);
    await flowDynamic(poems[randomIndex]);
})

const flow3 = addKeyword(['3']).addAnswer(    [
        'Te invitamos a visitar este link https://palabradepoeta.com/fip-2023/programa-fip-2023/',
    ],
    null,
    null,
    [flowSecundario]
)

const flow4 = addKeyword(['4']).addAnswer(    [
    'Te invitamos a visitar este link https://palabradepoeta.com/fip-2023/poetas-2023/',
],
null,
null,
[flowSecundario]
)

const flowPrincipal = addKeyword(['hola','día','días','ola','alo','qué','tal','como','cómo','esto','quién','quien','que','Hola','Wena','buen día','oli','holi','oye'])
    .addAnswer(['*¡Hola! 🤖🙌 ¡Te damos la bienvenida a Poesía IA!*',,    
            '¿Qué quieres?',,
            '1️⃣  Jugar al Cadáver Exquisito Infinito',,
            '2️⃣  Obtener inspiración para un poema',,
            '3️⃣  Conocer la programación fip Santiago 2023',,
            '4️⃣  Conocer a los poetas del festival'
        ],
        null,
        null,
        [flow1, flow2, flow3, flow4]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowSecundario, flow1, flow2, flow3, flow4, flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()

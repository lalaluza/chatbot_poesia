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
        'Las reglas del Cadáver Exquisito Infinito son:' ,,
         '1)💥🤖🦾Escribir versos utilizando SOLO las palabras que te ofrece el texto predictivo!', 
        '(Por supuesto que puedes elegir la palabra de inicio 😜)',, 
        '2) 💡♾️📲Puedes escribir todas las veces que quieras',, 
        '3)🔪❌😝 Si envías un mensaje que no es parte del juego serás eliminado del grupo',,  
        
        'Ingresa pinchando el link:',
        '✨⬇️⬇️⬇️⬇️✨',
        'https://chat.whatsapp.com/BRJ5i9DqxY79Oi7vWmjMXR'
    
],
null,
null,
[flowSecundario]
)

const flow2 = addKeyword(['2']).addAnswer(' ', null, async (ctx, {flowDynamic}) => {
    let poems = [
        'frase 1',
        'frase 2',
        'frase 3',
        'frase 4'
    ]

    let randomIndex = Math.floor(Math.random() * poems.length);
    await flowDynamic(poems[randomIndex]);
})

const flow3 = addKeyword(['3']).addAnswer(    [
        'Te invitamos a visitar este link https://palabradepoeta.com/fip-2022/',
    ],
    null,
    null,
    [flowSecundario]
)

const flow4 = addKeyword(['4']).addAnswer(    [
    'Te invitamos a visitar este link https://palabradepoeta.com/fip-2022/poetas-2022/',
],
null,
null,
[flowSecundario]
)

const flowPrincipal = addKeyword(['hola', 'alo','Hola','Wena','buen día','oli','holi','oye'])
    .addAnswer(['¡Hola! 🤖🙌 ¡Te damos la bienvenida a Poesía IA!',,    
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
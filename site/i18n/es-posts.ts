// Spanish translations of published posts (site standards pilot, 2026-09-24). Route
// /es/blog/<slug>/, rendered by site/pages/es/blog/[slug].astro; narrated with
// `npm run narrate -- --lang es <slug>`. The English post in src/lib/data.ts stays canonical.
// Model draft + independent review pass: see the route manifest's "translation" record.
// Every number, date, source and link is the English post's; kept-English terms are the ones
// Spanish-speaking marketers use (SEO, AEO/GEO, CTR, ROI, NAP, Local Pack, AI Overviews, and
// the product name Google Business Profile).

export interface SpanishPost {
  slug: string; title: string; date: string; datePublished: string; teaser: string; metaDescription: string; contentHtml: string;
}

export const esPosts: SpanishPost[] = [
  {
    slug: 'gbp-2026-ai-grounding',
    title: 'Tu Google Business Profile ahora es una fuente de grounding para la IA: lo que realmente cambió en 2026',
    date: 'agosto de 2026',
    datePublished: '2026-08',
    teaser: 'Durante una década, el Google Business Profile fue un activo de visibilidad. En 2026 se convirtió en una fuente de grounding para la IA, y ahora un perfil incompleto recibe un resumen de IA desfavorable, sin importar su calificación en estrellas. Las palancas que de verdad cambiaron y el plan de acción para 2026.',
    metaDescription: 'En 2026, el Google Business Profile pasó de ser un activo de visibilidad a una fuente de grounding para la IA. Qué cambió y el plan de acción para 2026.',
    contentHtml: `<h2>En resumen</h2>
<p>Durante una década, un Google Business Profile (GBP, el Perfil de Negocio de Google) fue un activo de <em>visibilidad</em>: ganar el Local Pack (los resultados locales con mapa) y recibir las llamadas. En 2026 ese enfoque se rompió. El GBP ahora es una de las principales <strong>fuentes de grounding para las respuestas de IA</strong>, es decir, la información en la que la IA basa lo que responde: los nuevos <strong>resúmenes de lugares generados por IA</strong> de Google (AI-generated Place Summaries) toman información de tus reseñas, tus publicaciones, tu contenido web y, lo más importante, de tu <strong>catálogo de productos</strong> para escribir el párrafo que una persona que busca (o un asistente de IA que actúa por ella) lee <em>en lugar de</em> tu perfil. La consecuencia incómoda: <strong>un perfil incompleto ahora recibe un resumen de IA desfavorable, sin importar su calificación en estrellas.</strong> Cinco estrellas y vacío es peor que cuatro estrellas y completo. Las palancas que importan cambiaron en consecuencia, de &quot;publicar para posicionarse&quot; a &quot;darle a la máquina una buena respuesta&quot;: una categoría principal específica, una <strong>velocidad de reseñas</strong> constante (2–5 por semana supera a un pico repentino), un <strong>catálogo de productos completo</strong> (ahora una entrada directa para la IA), <strong>preguntas frecuentes precargadas</strong> (texto de grounding) y fotos nuevas cada mes. Mientras tanto, los riesgos aumentaron: <strong>la verificación por video ahora es la opción predeterminada</strong>, una <strong>política sobre contenido generado con IA</strong> actúa de forma automática contra reseñas, fotos y premios falsos, y una nueva métrica, <strong>AI Surface attribution</strong>, por fin separa las vistas del &quot;panel local clásico&quot; de las del &quot;resumen de IA en Maps&quot; y las de &quot;AI Overviews&quot;. Esta es una síntesis de la <a href="https://www.digitalapplied.com/blog/google-business-profile-guide-every-feature-2026" hreflang="en">guía de GBP 2026 de Digital Applied</a> (en inglés), replanteada según lo que significa para la búsqueda con IA.</p>
<h2>El cambio que lo replantea todo</h2>
<p>Este es el cambio de modelo mental. El GBP de antes: <em>que te encuentren en el map pack.</em> El GBP de ahora: <strong>ser la fuente en la que confía la IA cuando responde por ti.</strong></p>
<p>Google ahora escribe un <strong>resumen de lugar generado por IA</strong> (AI Place Summary), un párrafo generado que describe tu negocio, armado a partir de tus reseñas, tus publicaciones, tu sitio web y tus fichas de productos. Cada vez más, ese resumen (o un <strong>asistente agéntico</strong> que consulta en tu nombre) es la superficie que el usuario realmente ve. Así que la pregunta dejó de ser &quot;¿estoy bien posicionado?&quot; y pasó a ser &quot;<strong>cuando la IA me describe, ¿tiene suficiente material bueno para describirme bien?</strong>&quot;. Un perfil con una gran calificación en estrellas pero sin productos, con fotos viejas y una sección de preguntas y respuestas vacía no le da al modelo nada con que trabajar, y la IA generará un resumen plano, genérico o desfavorable. Ahora la completitud es un factor de posicionamiento <em>y</em> de reputación.</p>
<figure style="margin:2rem 0;"><svg viewBox="0 0 780 614" role="img" aria-label="Google Business Profile en 2026: de ficha de visibilidad a fuente de grounding para la IA" style="width:100%;height:auto;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;display:block;">
<rect x="0" y="0" width="780" height="614" rx="14" fill="#0f172a"/>
<text x="30" y="46" fill="#f1f5f9" font-size="25" font-weight="800">Google Business Profile en 2026</text>
<text x="30" y="72" fill="#94a3b8" font-size="14">El cambio que replantea cada decisión de SEO local este año</text>
<rect x="30" y="92" width="345" height="66" rx="10" fill="#1e293b"/>
<text x="47" y="118" fill="#94a3b8" font-size="11" font-weight="800" letter-spacing="0.06em">EL ROL ANTERIOR</text>
<text x="47" y="140" fill="#f1f5f9" font-size="15" font-weight="700">Visibilidad: ganar el map pack</text>
<rect x="405" y="92" width="345" height="66" rx="10" fill="rgba(37,99,235,0.14)" stroke="#2563eb" stroke-width="1.5"/>
<text x="422" y="118" fill="#60a5fa" font-size="11" font-weight="800" letter-spacing="0.06em">EL ROL NUEVO (2026)</text>
<text x="422" y="140" fill="#f1f5f9" font-size="15" font-weight="700">La fuente de confianza de la IA sobre ti</text>
<text x="381" y="132" fill="#94a3b8" font-size="22" font-weight="800" text-anchor="middle">→</text>
<text x="30" y="192" fill="#f87171" font-size="12" font-weight="800">⚠ Nueva penalización: un perfil INCOMPLETO recibe un resumen de IA desfavorable, aun con 5 estrellas.</text>
<text x="30" y="228" fill="#f1f5f9" font-size="13" font-weight="800" letter-spacing="0.05em">LAS PALANCAS DE MAYOR IMPACTO (por prioridad)</text><rect x="30" y="244" width="720" height="52" rx="9" fill="#1e293b"/><rect x="30" y="244" width="4" height="52" rx="2" fill="#2563eb"/>
<circle cx="58" cy="270" r="13" fill="#2563eb"/><text x="58" y="275" fill="#0f172a" font-size="14" font-weight="800" text-anchor="middle">1</text>
<text x="82" y="266" fill="#f1f5f9" font-size="14.5" font-weight="700">Categoría principal</text>
<text x="82" y="285" fill="#94a3b8" font-size="12">hazla específica; revísala cada mes (la taxonomía cambió ~40 veces en 2025)</text><rect x="30" y="302" width="720" height="52" rx="9" fill="#1e293b"/><rect x="30" y="302" width="4" height="52" rx="2" fill="#10b981"/>
<circle cx="58" cy="328" r="13" fill="#10b981"/><text x="58" y="333" fill="#0f172a" font-size="14" font-weight="800" text-anchor="middle">2</text>
<text x="82" y="324" fill="#f1f5f9" font-size="14.5" font-weight="700">Velocidad de reseñas</text>
<text x="82" y="343" fill="#94a3b8" font-size="12">2–5 por semana supera a un pico · aumento de 2.8× en el CTR · responde en 24 h</text><rect x="30" y="360" width="720" height="52" rx="9" fill="#1e293b"/><rect x="30" y="360" width="4" height="52" rx="2" fill="#7c3aed"/>
<circle cx="58" cy="386" r="13" fill="#7c3aed"/><text x="58" y="391" fill="#0f172a" font-size="14" font-weight="800" text-anchor="middle">3</text>
<text x="82" y="382" fill="#f1f5f9" font-size="14.5" font-weight="700">Catálogo de productos</text>
<text x="82" y="401" fill="#94a3b8" font-size="12">ahora es una entrada DIRECTA para las respuestas de IA · la sección que más se deja vacía</text><rect x="30" y="418" width="720" height="52" rx="9" fill="#1e293b"/><rect x="30" y="418" width="4" height="52" rx="2" fill="#f59e0b"/>
<circle cx="58" cy="444" r="13" fill="#f59e0b"/><text x="58" y="449" fill="#0f172a" font-size="14" font-weight="800" text-anchor="middle">4</text>
<text x="82" y="440" fill="#f1f5f9" font-size="14.5" font-weight="700">Precarga 10–15 preguntas frecuentes</text>
<text x="82" y="459" fill="#94a3b8" font-size="12">texto de grounding para el resumen de IA: precárgalas tú</text><rect x="30" y="476" width="720" height="52" rx="9" fill="#1e293b"/><rect x="30" y="476" width="4" height="52" rx="2" fill="#0891b2"/>
<circle cx="58" cy="502" r="13" fill="#0891b2"/><text x="58" y="507" fill="#0f172a" font-size="14" font-weight="800" text-anchor="middle">5</text>
<text x="82" y="498" fill="#f1f5f9" font-size="14.5" font-weight="700">Publicaciones semanales + fotos</text>
<text x="82" y="517" fill="#94a3b8" font-size="12">+42% cómo llegar · +35% clics · renueva 4–6 al mes</text><rect x="30" y="534" width="720" height="46" rx="9" fill="rgba(239,68,68,0.10)" stroke="#ef4444" stroke-width="1.3"/>
<text x="47" y="554" fill="#f87171" font-size="12" font-weight="800">NUEVOS RIESGOS</text>
<text x="47" y="572" fill="#f1f5f9" font-size="12">Verificación por video por defecto · política de contenido con IA: sanción automática por reseñas, fotos y premios falsos.</text>
<text x="30" y="592" fill="#94a3b8" font-size="10.5">Fuente: guía de GBP 2026 de Digital Applied. Más de 200 millones de perfiles verificados · el 46% de las búsquedas locales muestra Maps.</text>
<text x="30" y="606" fill="#94a3b8" font-size="10.5">Enfoque: el GBP como fuente de grounding para la IA.</text>
</svg><figcaption style="font-size:0.82rem;color:#64748b;margin-top:8px;text-align:center;font-style:italic;">En 2026, el Google Business Profile pasa de ser una ficha de visibilidad a ser el conjunto de datos que la IA lee sobre ti.</figcaption></figure><h2>Las palancas de mayor impacto (por orden de prioridad)</h2>
<p>La mayoría de los consejos sobre GBP son una lista de verificación plana. Esta es la versión ponderada según su impacto en 2026:</p>
<ol>
<li><strong>Categoría principal: la palanca más importante.</strong> Es tu declaración de posicionamiento de una sola palabra ante Google. Lo específico supera a lo general; usa la misma categoría principal que tus tres competidores mejor posicionados. Google cambió su taxonomía de categorías ~40 veces en 2025, así que <strong>revísala cada mes</strong>: una categoría retirada sin aviso te hunde sin hacer ruido.</li>
<li><strong>Velocidad de reseñas, no cantidad de reseñas.</strong> Un ritmo constante de <strong>2–5 reseñas por semana durante 90 días</strong> se acumula en &quot;popularidad&quot; y se correlaciona con un <strong>aumento de 2.8× en el CTR</strong> (tasa de clics); un pico repentino de volumen se interpreta como manipulación. Responde en menos de <strong>24 horas</strong>: la respuesta en sí es una señal de interacción.</li>
<li><strong>Catálogo de productos: la sección menos aprovechada.</strong> Ahora alimenta <em>directamente</em> las respuestas de IA (&quot;¿alguien cerca vende X?&quot;). La mayoría de los negocios locales lo deja vacío. Completarlo es una de las acciones con mayor ROI y menor competencia disponibles en 2026.</li>
<li><strong>Precarga tú mismo 10–15 preguntas frecuentes.</strong> Las preguntas y respuestas de los usuarios son una fuente de grounding para el resumen de IA, y si no las precargas tú, lo harán la desinformación o la competencia. Precarga las preguntas reales con las respuestas reales.</li>
<li><strong>Publicaciones semanales + fotos nuevas cada mes.</strong> Las publicaciones impulsan la <em>conversión</em>, no el posicionamiento, pero ocupan espacio frente a la competencia y alimentan el resumen. Los perfiles con fotos reciben <strong>~42% más solicitudes de instrucciones sobre cómo llegar y ~35% más clics al sitio web</strong>; renueva 4–6 fotos al mes en lugar de subir un lote de una sola vez.</li>
</ol>
<h2>Las distinciones que confunden</h2>
<ul>
<li><strong>Las publicaciones impulsan la conversión, no el posicionamiento.</strong> Deja de esperar que una publicación de &quot;Novedades&quot; (What&#39;s New) te suba en el Local Pack; espera que convierta a la persona que ya está buscando.</li>
<li><strong>En reseñas, la velocidad supera al volumen.</strong> Dos por semana durante un año superan a 100 en un mes.</li>
<li><strong>La completitud ahora es reputacional.</strong> La penalización por perfil incompleto es nueva: la IA escribe un peor resumen sobre un perfil con poca información, aun con buenas reseñas.</li>
<li><strong>&quot;La IA como editora, no como generadora&quot;.</strong> La política de Google, ahora más estricta, permite redactar <em>con ayuda</em> de IA, pero actúa automáticamente contra reseñas <em>generadas</em> por IA, fotos del personal fabricadas y premios inventados. Mantén a una persona a cargo de cada texto que ven los clientes.</li>
</ul>
<h2>Los nuevos riesgos</h2>
<p>Tres cosas se endurecieron en 2026, y cada una puede costarte visibilidad:</p>
<ul>
<li><strong>La verificación por video ahora es la opción predeterminada</strong> para negocios con establecimiento físico y negocios de servicios (la postal quedó obsoleta). Prepárate para grabar un solo clip continuo y sin editar que muestre el letrero → el interior → una acción de administración. Hazlo bien a la primera.</li>
<li><strong>Política sobre contenido con IA con aplicación automática.</strong> Reseñas falsas, fotos fabricadas con IA, servicios o premios inventados → riesgo de suspensión. La suspensión parcial limita funciones; <strong>la suspensión total te elimina por completo de la Búsqueda de Google y de Maps</strong>.</li>
<li><strong>Los detonantes clásicos de suspensión siguen vigentes:</strong> discrepancias de NAP (nombre, dirección y teléfono) o de dirección, conflicto entre la categoría y el establecimiento, fichas duplicadas y nombres de negocio llenos de palabras clave. Haz cada trimestre una <strong>revisión de consistencia de citas</strong> en tus 20 citas principales: las variaciones del NAP erosionan la confianza en la entidad de la que depende la IA.</li>
</ul>
<h2>Por fin, una métrica que te dice adónde te envía la IA</h2>
<p>La renovada pestaña Rendimiento agregó <strong>AI Surface attribution</strong>: divide tus impresiones entre el <strong>panel local clásico</strong>, el <strong>resumen de IA en Maps</strong> y los <strong>AI Overviews de Google</strong>. Por primera vez puedes ver cuánto de tu descubrimiento ya llega por superficies de IA frente al panel tradicional. Si este trimestre haces una sola cosa de medición, vigila esa división: te dice qué tan rápido está llegando la era de las fuentes de grounding a <em>tu</em> categoría.</p>
<h2>El plan de acción de GBP para 2026 (haz esto)</h2>
<table>
<thead>
<tr>
<th>Acción</th>
<th>Por qué importa en 2026</th>
</tr>
</thead>
<tbody><tr>
<td>Haz específica la <strong>categoría principal</strong>; revísala cada mes</td>
<td>La mayor palanca de posicionamiento; la taxonomía cambió ~40× en 2025</td>
</tr>
<tr>
<td>Ritmo constante de <strong>2–5 reseñas por semana</strong>; responde en 24 h</td>
<td>Velocidad → popularidad; <strong>aumento de 2.8× en el CTR</strong></td>
</tr>
<tr>
<td><strong>Completa el catálogo de productos</strong></td>
<td>Entrada directa para las respuestas de IA; poco aprovechado</td>
</tr>
<tr>
<td><strong>Precarga 10–15 preguntas frecuentes</strong> con respuestas reales</td>
<td>Texto de grounding para el resumen de IA</td>
</tr>
<tr>
<td><strong>Publicaciones semanales + 4–6 fotos nuevas al mes</strong></td>
<td>Conversión + material para el resumen; <strong>+42% cómo llegar / +35% clics</strong></td>
</tr>
<tr>
<td><strong>Completa todos los campos</strong></td>
<td>Los perfiles incompletos reciben resúmenes de IA desfavorables</td>
</tr>
<tr>
<td><strong>Que una persona edite todo texto asistido por IA</strong></td>
<td>La política actúa automáticamente contra el contenido generado por IA</td>
</tr>
<tr>
<td>Revisión trimestral de <strong>citas y NAP</strong></td>
<td>Protege la confianza en la entidad de la que depende la IA</td>
</tr>
<tr>
<td>Vigila <strong>AI Surface attribution</strong></td>
<td>Muestra cuánto de tu descubrimiento ya viene de la IA</td>
</tr>
</tbody></table>
<h2>La conclusión</h2>
<p>Los negocios que ganan en búsqueda local en 2026 no son los que tienen más reseñas: son los que le dan a la IA el material <strong>más rico, más consistente y más completo</strong> en el cual basar una respuesta. Trata tu Business Profile menos como una ficha que configuras y olvidas, y más como el <strong>conjunto de datos canónico que una IA lee sobre ti todos los días.</strong> Aliméntalo bien.</p>
<blockquote>
<p><strong>¿Te resultó útil?</strong> Compártelo con quien lleve el marketing local o de varias ubicaciones: la penalización por &quot;perfil incompleto&quot; es la que sorprende a la gente. Y si la visibilidad en la búsqueda con IA (AEO/GEO) está en tu radar, a eso me dedico.</p>
</blockquote>
<h2>Fuentes</h2>
<ul>
<li><a href="https://www.digitalapplied.com/blog/google-business-profile-guide-every-feature-2026" hreflang="en">Google Business Profile 2026 Guide — Digital Applied</a> (en inglés; aquí se sintetizan su inventario de funciones, sus estadísticas y los cambios de 2026; el análisis y el enfoque son míos).</li>
</ul>
`,
  },
];

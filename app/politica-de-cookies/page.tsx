import PageLayout from '../PageLayout';

export default function CookiesPolicyPage() {
  return (
    <PageLayout 
      title="Política de Cookies" 
      description="Entenda como utilizamos cookies em nosso site"
      headerImageSrc="/images/cookies-header.jpg"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-md rounded-lg p-8">
            <div className="prose prose-lg max-w-none">
              <h2>Política de Cookies da Orthosais Farma</h2>
              <p className="text-gray-500">Última atualização: Julho de 2023</p>
              
              <p>
                Esta Política de Cookies explica como a Orthosais Farma utiliza cookies e tecnologias semelhantes 
                para reconhecê-lo quando você visita nosso site. Ela explica o que são essas tecnologias, por que as usamos 
                e como você pode controlá-las.
              </p>
              
              <h3>1. O que são Cookies?</h3>
              <p>
                Cookies são pequenos arquivos de dados que são colocados no seu dispositivo quando você visita um site. 
                Eles são amplamente utilizados para fazer os sites funcionarem de maneira mais eficiente, bem como fornecer 
                informações aos proprietários do site.
              </p>
              <p>
                Os cookies podem ser "persistentes" ou "de sessão". Cookies persistentes permanecem no seu dispositivo 
                mesmo depois que você fecha o navegador, enquanto cookies de sessão são excluídos assim que você fecha o navegador.
              </p>
              
              <h3>2. Como Utilizamos os Cookies</h3>
              <p>
                Utilizamos diferentes tipos de cookies por várias razões:
              </p>
              <ul>
                <li><strong>Cookies Essenciais:</strong> Necessários para o funcionamento básico do site. Permitem que você navegue pelo site e use recursos essenciais.</li>
                <li><strong>Cookies Analíticos/de Desempenho:</strong> Permitem-nos reconhecer e contar o número de visitantes e ver como os visitantes navegam pelo site. Isso nos ajuda a melhorar o funcionamento do site.</li>
                <li><strong>Cookies de Funcionalidade:</strong> Utilizados para reconhecê-lo quando você retorna ao site. Isso nos permite personalizar nosso conteúdo para você e lembrar suas preferências.</li>
                <li><strong>Cookies de Publicidade/Direcionamento:</strong> Registram sua visita ao site, as páginas que você visitou e os links que seguiu. Usamos essas informações para tornar a publicidade mais relevante para seus interesses.</li>
              </ul>
              
              <h3>3. Cookies que Utilizamos</h3>
              <p>
                Abaixo está uma lista dos principais tipos de cookies que utilizamos e suas finalidades:
              </p>
              
              <table className="w-full border-collapse my-4">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2 text-left">Tipo de Cookie</th>
                    <th className="border border-gray-300 p-2 text-left">Finalidade</th>
                    <th className="border border-gray-300 p-2 text-left">Duração</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2">Sessão</td>
                    <td className="border border-gray-300 p-2">Manter o estado da sua sessão no site</td>
                    <td className="border border-gray-300 p-2">Sessão</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Google Analytics</td>
                    <td className="border border-gray-300 p-2">Coletar informações sobre como você utiliza o site</td>
                    <td className="border border-gray-300 p-2">2 anos</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Preferências</td>
                    <td className="border border-gray-300 p-2">Armazenar suas preferências de navegação</td>
                    <td className="border border-gray-300 p-2">1 ano</td>
                  </tr>
                </tbody>
              </table>
              
              <h3>4. Cookies de Terceiros</h3>
              <p>
                Além de nossos próprios cookies, podemos também utilizar cookies de terceiros para relatórios de estatísticas 
                de uso, entrega de anúncios e outras operações. Estes cookies podem permanecer em seu dispositivo após você 
                sair do nosso site.
              </p>
              <p>
                Alguns exemplos de parceiros terceiros que podem colocar cookies em seu dispositivo através do nosso site incluem:
              </p>
              <ul>
                <li><strong>Google Analytics:</strong> Para análise de tráfego e comportamento dos usuários.</li>
                <li><strong>Redes Sociais:</strong> Para integrações com plataformas como Facebook, Instagram e Twitter.</li>
              </ul>
              
              <h3>5. Como Gerenciar Cookies</h3>
              <p>
                Você pode controlar e gerenciar cookies de várias maneiras. Lembre-se que remover ou bloquear cookies pode impactar 
                sua experiência de usuário e partes do nosso site podem não funcionar corretamente.
              </p>
              <p>
                A maioria dos navegadores permite que você veja quais cookies você tem e que os delete individualmente 
                ou bloqueie cookies de determinados sites. Você pode encontrar informações sobre como gerenciar cookies nos 
                principais navegadores abaixo:
              </p>
              <ul>
                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/pt-BR/kb/protecao-aprimorada-contra-rastreamento-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/pt-br/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Safari</a></li>
                <li><a href="https://support.microsoft.com/pt-br/microsoft-edge/excluir-cookies-no-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Microsoft Edge</a></li>
              </ul>
              
              <h3>6. Alterações nesta Política</h3>
              <p>
                Podemos atualizar esta Política de Cookies periodicamente para refletir alterações nas tecnologias que utilizamos 
                ou por outros motivos operacionais, legais ou regulatórios. Recomendamos que você visite esta página regularmente 
                para se manter informado sobre nosso uso de cookies e tecnologias relacionadas.
              </p>
              
              <h3>7. Contato</h3>
              <p>
                Se você tiver dúvidas ou comentários sobre esta Política de Cookies, entre em contato conosco através do e-mail: 
                privacidade@orthosais.com.br.
              </p>
              
              <hr className="my-8" />
              
              <p className="text-sm text-gray-500 text-center">
                © {new Date().getFullYear()} Orthosais Farma. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
} 
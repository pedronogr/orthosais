import PageLayout from '../PageLayout';

export default function PrivacyPolicyPage() {
  return (
    <PageLayout 
      title="Política de Privacidade" 
      description="Entenda como tratamos seus dados pessoais"
      headerImageSrc="/images/privacy-header.jpg"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-md rounded-lg p-8">
            <div className="prose prose-lg max-w-none">
              <h2>Política de Privacidade da Orthosais Farma</h2>
              <p className="text-gray-500">Última atualização: Junho de 2023</p>
              
              <p>
                A Orthosais Farma está comprometida em proteger a privacidade e os dados pessoais de nossos clientes, 
                pacientes, parceiros e visitantes do site. Esta Política de Privacidade descreve como coletamos, usamos, 
                armazenamos e protegemos suas informações pessoais em conformidade com a Lei Geral de Proteção de Dados 
                (LGPD) e outras legislações aplicáveis.
              </p>
              
              <h3>1. Dados que Coletamos</h3>
              <p>
                Podemos coletar os seguintes tipos de informações pessoais:
              </p>
              <ul>
                <li><strong>Informações de identificação:</strong> nome, endereço, telefone, e-mail, CPF e outros dados cadastrais.</li>
                <li><strong>Informações de saúde:</strong> quando relevante para o fornecimento de nossos produtos e serviços, como no caso de notificações de farmacovigilância.</li>
                <li><strong>Informações de uso do site:</strong> dados sobre como você interage com nosso site, incluindo endereço IP, tipo de navegador, páginas visitadas e tempo de permanência.</li>
                <li><strong>Informações de marketing:</strong> suas preferências em receber comunicações e materiais promocionais.</li>
              </ul>
              
              <h3>2. Como Usamos seus Dados</h3>
              <p>
                Utilizamos suas informações pessoais para:
              </p>
              <ul>
                <li>Fornecer, manter e melhorar nossos produtos e serviços.</li>
                <li>Processar solicitações, pedidos e transações.</li>
                <li>Monitorar a segurança de nossos produtos e atender a requisitos de farmacovigilância.</li>
                <li>Enviar comunicações sobre nossos produtos, serviços e eventos (com seu consentimento).</li>
                <li>Cumprir obrigações legais e regulatórias aplicáveis à indústria farmacêutica.</li>
                <li>Proteger nossos direitos, propriedade ou segurança, bem como os de nossos usuários e terceiros.</li>
              </ul>
              
              <h3>3. Compartilhamento de Dados</h3>
              <p>
                Podemos compartilhar suas informações pessoais com:
              </p>
              <ul>
                <li><strong>Prestadores de serviços:</strong> empresas que nos auxiliam em nossas operações (como processamento de pagamentos, análise de dados, hospedagem de site).</li>
                <li><strong>Parceiros comerciais:</strong> distribuidores e profissionais de saúde envolvidos no fornecimento de nossos produtos.</li>
                <li><strong>Órgãos reguladores:</strong> como a ANVISA, para fins de farmacovigilância e cumprimento de obrigações legais.</li>
                <li><strong>Terceiros em transações corporativas:</strong> em caso de fusão, aquisição ou venda de ativos.</li>
              </ul>
              <p>
                Somente compartilhamos suas informações com terceiros que se comprometem a manter níveis adequados de proteção de dados.
              </p>
              
              <h3>4. Armazenamento e Segurança</h3>
              <p>
                Implementamos medidas técnicas e organizacionais adequadas para proteger suas informações pessoais contra acesso, 
                uso ou divulgação não autorizados. Seus dados são armazenados em ambiente seguro e pelo tempo necessário para 
                cumprir as finalidades para as quais foram coletados, ou conforme exigido por lei.
              </p>
              
              <h3>5. Seus Direitos</h3>
              <p>
                De acordo com a LGPD, você tem direito a:
              </p>
              <ul>
                <li>Confirmar se seus dados pessoais são tratados por nós.</li>
                <li>Acessar seus dados pessoais.</li>
                <li>Corrigir dados incompletos, inexatos ou desatualizados.</li>
                <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade.</li>
                <li>Solicitar a portabilidade de seus dados para outro fornecedor de serviço.</li>
                <li>Revogar o consentimento a qualquer momento.</li>
              </ul>
              <p>
                Para exercer esses direitos, entre em contato conosco através do e-mail: privacidade@orthosais.com.br.
              </p>
              
              <h3>6. Cookies e Tecnologias Semelhantes</h3>
              <p>
                Nosso site utiliza cookies e tecnologias semelhantes para melhorar sua experiência, analisar o tráfego 
                e personalizar conteúdo. Você pode gerenciar suas preferências de cookies através das configurações do seu navegador.
              </p>
              
              <h3>7. Alterações nesta Política</h3>
              <p>
                Podemos atualizar esta Política de Privacidade periodicamente. A versão mais recente estará sempre 
                disponível em nosso site, com a data da última atualização. Recomendamos que você revise esta política regularmente.
              </p>
              
              <h3>8. Contato</h3>
              <p>
                Se você tiver dúvidas ou preocupações sobre esta Política de Privacidade ou sobre como tratamos seus dados pessoais, 
                entre em contato com nosso Encarregado de Proteção de Dados através do e-mail: dpo@orthosais.com.br.
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
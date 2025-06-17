import PageLayout from '../PageLayout';

export default function TermsOfUsePage() {
  return (
    <PageLayout 
      title="Termos de Uso" 
      description="Condições gerais para uso do site e dos produtos Orthosais"
      headerImageSrc="/images/terms-header.jpg"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-md rounded-lg p-8">
            <div className="prose prose-lg max-w-none">
              <h2>Termos de Uso da Orthosais Farma</h2>
              <p className="text-gray-500">Última atualização: Julho de 2023</p>
              
              <p>
                Bem-vindo ao site da Orthosais Farma. Ao acessar e utilizar este site, você concorda com os termos e condições
                descritos abaixo. Por favor, leia-os atentamente.
              </p>
              
              <h3>1. Aceitação dos Termos</h3>
              <p>
                Ao acessar ou usar o site da Orthosais Farma, você reconhece que leu, entendeu e concorda em cumprir estes 
                Termos de Uso, bem como todas as leis e regulamentos aplicáveis. Se você não concordar com estes termos,
                por favor, não utilize nosso site.
              </p>
              
              <h3>2. Uso do Site</h3>
              <p>
                A Orthosais Farma concede a você uma licença limitada, não exclusiva e não transferível para acessar e 
                utilizar este site para fins informativos e pessoais, desde que:
              </p>
              <ul>
                <li>Você não modifique ou copie materiais do site, exceto com autorização expressa.</li>
                <li>Você não utilize o site para fins comerciais sem nossa autorização prévia.</li>
                <li>Você não tente acessar áreas restritas do site ou burlar medidas de segurança.</li>
                <li>Você não transmita vírus, malware ou outros códigos de natureza destrutiva.</li>
              </ul>
              
              <h3>3. Propriedade Intelectual</h3>
              <p>
                Todo o conteúdo deste site, incluindo textos, gráficos, logotipos, ícones, imagens, áudios, vídeos, downloads
                digitais e compilações de dados, é propriedade exclusiva da Orthosais Farma ou de seus fornecedores de conteúdo 
                e está protegido por leis de direitos autorais, marcas registradas e outras leis de propriedade intelectual.
              </p>
              <p>
                Nada contido neste site deve ser interpretado como uma concessão de licença ou direito de usar qualquer 
                propriedade intelectual sem permissão prévia por escrito da Orthosais Farma.
              </p>
              
              <h3>4. Informações sobre Produtos</h3>
              <p>
                As informações sobre produtos farmacêuticos disponibilizadas neste site destinam-se apenas a fins informativos
                e educacionais. Não constituem aconselhamento médico ou farmacêutico e não devem substituir a consulta a um 
                profissional de saúde qualificado.
              </p>
              <p>
                A Orthosais Farma não se responsabiliza por decisões tomadas com base nas informações contidas neste site.
                Para informações específicas sobre indicações, contraindicações, posologia e efeitos adversos, consulte 
                sempre a bula do produto e um profissional de saúde.
              </p>
              
              <h3>5. Isenção de Responsabilidade</h3>
              <p>
                Este site e seu conteúdo são fornecidos "como estão" e "conforme disponíveis", sem garantias de qualquer tipo, 
                expressas ou implícitas. A Orthosais Farma não garante que o site funcionará sem interrupções ou estará livre de erros.
              </p>
              <p>
                Em nenhuma circunstância a Orthosais Farma será responsável por quaisquer danos diretos, indiretos, incidentais, 
                consequenciais, especiais ou punitivos decorrentes ou relacionados ao uso ou incapacidade de uso deste site ou seu conteúdo.
              </p>
              
              <h3>6. Links para Sites de Terceiros</h3>
              <p>
                Nosso site pode conter links para sites de terceiros que não são de propriedade ou controlados pela Orthosais Farma. 
                Não temos controle e não assumimos responsabilidade pelo conteúdo, políticas de privacidade ou práticas de sites de terceiros.
              </p>
              <p>
                A inclusão de qualquer link não implica endosso por parte da Orthosais Farma. O uso de tais links é por sua conta e risco.
              </p>
              
              <h3>7. Alterações nos Termos de Uso</h3>
              <p>
                A Orthosais Farma reserva-se o direito de modificar estes Termos de Uso a qualquer momento. As alterações entrarão 
                em vigor imediatamente após sua publicação no site. O uso contínuo do site após a publicação de alterações 
                constitui sua aceitação dessas mudanças.
              </p>
              
              <h3>8. Lei Aplicável</h3>
              <p>
                Estes Termos de Uso são regidos e interpretados de acordo com as leis brasileiras. Qualquer disputa decorrente 
                ou relacionada a estes termos será submetida à jurisdição exclusiva dos tribunais brasileiros.
              </p>
              
              <h3>9. Contato</h3>
              <p>
                Se você tiver dúvidas ou preocupações sobre estes Termos de Uso, entre em contato conosco através do e-mail: 
                juridico@orthosais.com.br.
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
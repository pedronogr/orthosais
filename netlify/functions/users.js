const { createClient } = require('@supabase/supabase-js');

// Inicializa o cliente Supabase com variáveis de ambiente
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

// Verifica se as variáveis de ambiente estão definidas
const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

exports.handler = async (event, context) => {
  // Verificar autenticação
  const authHeader = event.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Não autorizado' })
    };
  }

  // Verificar se o Supabase está configurado
  if (!supabase) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: 'Erro de configuração do servidor - Supabase não configurado',
        fallbackData: getMockUsers()
      })
    };
  }

  try {
    // Buscar usuários do Supabase
    const { data, error, count } = await supabase
      .from('users')
      .select('*', { count: 'exact' });

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify({
        users: data || [],
        count: count || 0
      })
    };
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    
    // Retornar dados mock em caso de erro
    return {
      statusCode: 200,
      body: JSON.stringify({
        users: getMockUsers(),
        count: 2,
        isLocalData: true
      })
    };
  }
};

// Função para retornar dados mock de usuários quando o Supabase não estiver disponível
function getMockUsers() {
  return [
    {
      id: '1',
      name: 'Pedro Admin',
      email: 'pedro@admin.com',
      role: 'admin',
      status: 'active',
      created_at: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: '2',
      name: 'Cliente Teste',
      email: 'cliente@teste.com',
      role: 'customer',
      status: 'active',
      created_at: new Date(Date.now() - 172800000).toISOString()
    }
  ];
} 
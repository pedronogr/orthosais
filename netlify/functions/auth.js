const { createClient } = require('@supabase/supabase-js');

// Inicializa o cliente Supabase com variáveis de ambiente
// Essas variáveis precisam ser definidas nas configurações do Netlify
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

// Verifica se as variáveis de ambiente estão definidas
const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

exports.handler = async (event, context) => {
  // Verifica se o método é permitido
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Método não permitido' })
    };
  }

  // Verifica se o Supabase está configurado
  if (!supabase) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: 'Erro de configuração do servidor - Supabase não configurado',
        fallbackToLocalStorage: true
      })
    };
  }

  try {
    const { action, ...data } = JSON.parse(event.body);

    // Roteamento baseado na ação solicitada
    switch (action) {
      case 'login':
        return await handleLogin(data);
      case 'register':
        return await handleRegister(data);
      case 'logout':
        return await handleLogout(data);
      default:
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'Ação inválida' })
        };
    }
  } catch (error) {
    console.error('Erro na função de autenticação:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: 'Erro interno do servidor',
        error: error.message,
        fallbackToLocalStorage: true
      })
    };
  }
};

// Função de login
async function handleLogin({ email, password }) {
  try {
    // Autenticação com Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    // Buscar dados adicionais do usuário se necessário
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id, name, email')
      .eq('email', email)
      .single();

    if (userError) throw userError;

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Login realizado com sucesso',
        user: userData || {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.name || 'Usuário'
        },
        session: data.session
      })
    };
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return {
      statusCode: 401,
      body: JSON.stringify({ 
        message: 'Falha na autenticação',
        error: error.message,
        fallbackToLocalStorage: true
      })
    };
  }
}

// Função de registro
async function handleRegister({ name, email, password }) {
  try {
    // Verificar se o usuário já existe
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (existingUser) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Email já cadastrado' })
      };
    }

    // Registrar o usuário na autenticação do Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name
        }
      }
    });

    if (authError) throw authError;

    // Inserir dados adicionais do usuário na tabela users
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert([
        {
          id: authData.user.id,
          name,
          email,
          created_at: new Date()
        }
      ])
      .select()
      .single();

    if (userError) throw userError;

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: 'Usuário registrado com sucesso',
        user: userData
      })
    };
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: 'Falha ao registrar usuário',
        error: error.message,
        fallbackToLocalStorage: true
      })
    };
  }
}

// Função de logout
async function handleLogout({ session }) {
  try {
    if (session) {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Logout realizado com sucesso' })
    };
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: 'Falha ao fazer logout',
        error: error.message
      })
    };
  }
} 
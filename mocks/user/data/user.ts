export interface User {
  name: string;
  email: string;
  initials: string;
  avatar: string;
}

export const MOCK_USER: User = {
  name: 'Acme Inc',
  email: 'usuario@email.com',
  initials: 'AI',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Acme',
};

export function getGreeting(): string {
  const hour = new Date().getHours();
  
  if (hour < 12) {
    return 'Bom dia';
  } else if (hour < 18) {
    return 'Boa tarde';
  } else {
    return 'Boa noite';
  }
}


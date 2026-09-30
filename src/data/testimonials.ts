export type Testimonial = {
  name: string;
  role: string;
  content: string;
  avatar?: string;
  linkedin?: string;
};

// A seção de depoimentos da home só aparece quando esta lista tem itens.
// Adicione apenas depoimentos reais, com autorização de quem escreveu.
export const testimonials: Testimonial[] = [];

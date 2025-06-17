import React, { useState } from 'react';
import Image from 'next/image';

interface Review {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  rating: number;
  date: string;
  comment: string;
}

interface ProductReviewsProps {
  productId: string;
  reviews: Review[];
}

export default function ProductReviews({ productId, reviews }: ProductReviewsProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    // Em produção, isso enviaria a avaliação para a API
    console.log('Nova avaliação:', newReview);
    setShowReviewForm(false);
    setNewReview({ rating: 5, comment: '' });
  };

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Avaliações dos Clientes
            </h2>
            <button
              onClick={() => setShowReviewForm(true)}
              className="bg-primary text-white px-6 py-2 rounded-md font-medium hover:bg-primary-hover transition-colors duration-300"
            >
              Escrever Avaliação
            </button>
          </div>

          {/* Resumo das Avaliações */}
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold text-primary">
                {averageRating.toFixed(1)}
              </div>
              <div>
                <div className="flex items-center mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-5 h-5 ${
                        star <= averageRating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  Baseado em {reviews.length} avaliações
                </p>
              </div>
            </div>
          </div>

          {/* Formulário de Avaliação */}
          {showReviewForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg p-6 max-w-lg w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Escrever Avaliação</h3>
                  <button
                    onClick={() => setShowReviewForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <form onSubmit={handleSubmitReview}>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Sua Avaliação</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className="text-2xl"
                        >
                          {star <= newReview.rating ? '★' : '☆'}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Seu Comentário</label>
                    <textarea
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={4}
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="bg-primary text-white px-6 py-2 rounded-md font-medium hover:bg-primary-hover"
                    >
                      Enviar Avaliação
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Lista de Avaliações */}
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-6 last:border-b-0">
                <div className="flex items-start gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={review.user.avatar}
                      alt={review.user.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900">{review.user.name}</h4>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`w-4 h-4 ${
                                star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 
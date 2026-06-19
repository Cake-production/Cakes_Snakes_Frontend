const FAQsPage = ({ onNavigate }) => {
  const faqCategories = [
    {
      title: "🛒 Ordering",
      icon: "🛒",
      questions: [
        {
          q: "How do I place an order?",
          a: "Browse our collections, add items to your cart, and proceed to checkout. You’ll be guided step‑by‑step – it’s quick and easy."
        },
        {
          q: "Can I modify my order after placing it?",
          a: "Yes – contact us within 1 hour of placing your order and we’ll do our best to accommodate changes."
        }
      ]
    },
    {
      title: "🚚 Delivery",
      icon: "🚚",
      questions: [
        {
          q: "What delivery options do you offer?",
          a: "Standard (5–7 days, free), Express (2–3 days, $25), and White Glove (next day, $85). All orders include tracking."
        },
        {
          q: "Do you deliver outside Sri Lanka?",
          a: "Currently we deliver only within Sri Lanka. We’re working on expanding internationally – stay tuned!"
        }
      ]
    },
    {
      title: "🎨 Customisation",
      icon: "🎨",
      questions: [
        {
          q: "Can I customise my cake?",
          a: "Absolutely! We love bespoke creations. Just share your ideas – flavours, fillings, designs – and we’ll bring them to life."
        }
      ]
    },
    {
      title: "🔄 Returns & Refunds",
      icon: "🔄",
      questions: [
        {
          q: "What is your return policy?",
          a: "If your order arrives damaged or incorrect, notify us within 24 hours. We’ll replace it or issue a full refund – your satisfaction matters."
        },
        {
          q: "Can I cancel my order?",
          a: "Orders can be cancelled within 1 hour of placement. After that, we’ve already started crafting your treats."
        }
      ]
    },
    {
      title: "📦 Tracking",
      icon: "📦",
      questions: [
        {
          q: "How can I track my order?",
          a: "Once dispatched, you’ll receive a tracking link via email. You can monitor your delivery in real time."
        }
      ]
    },
    {
      title: "💳 Payment",
      icon: "💳",
      questions: [
        {
          q: "What payment methods do you accept?",
          a: "We accept Visa, Mastercard, Apple Pay, and PayPal – all securely processed."
        }
      ]
    }
  ];

  return (
    <main style={{ backgroundColor: colors.softCream, minHeight: '100vh' }} className="py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => onNavigate('storefront')}
          style={{ color: colors.gold }}
          className="mb-6 flex items-center gap-2 font-semibold hover:opacity-80 transition"
        >
          ← Back to Shop
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div style={{ backgroundColor: colors.darkPlum }} className="px-8 py-6 text-white">
            <h2 className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
              Frequently Asked Questions
            </h2>
            <p className="opacity-80 text-sm mt-1">
              Everything you need to know – from ordering to delivery and beyond.
            </p>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {faqCategories.map((category, idx) => (
                <div key={idx}>
                  <h3 className="font-bold text-lg text-gray-800 mb-3 flex items-center gap-2">
                    <span style={{ fontSize: '24px' }}>{category.icon}</span>
                    {category.title}
                  </h3>
                  <div className="space-y-4">
                    {category.questions.map((item, qIdx) => (
                      <div key={qIdx} className="border-l-2 border-gold pl-3">
                        <p className="font-semibold text-gray-800 text-sm">{item.q}</p>
                        <p className="text-gray-600 text-sm mt-0.5">{item.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div style={{ backgroundColor: colors.champagne }} className="px-8 py-6 text-center">
            <p className="text-gray-700">
              Still have questions?{' '}
              <button
                onClick={() => onNavigate('contact')}
                style={{ color: colors.gold }}
                className="font-semibold hover:underline"
              >
                Contact our team
              </button>
              – we’re always happy to help.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
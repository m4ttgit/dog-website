import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hero1.jpg"
            alt="Happy dogs"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
        </div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            Discover the World of Dogs
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            From playful pups to loyal companions, explore everything you need to know about our furry friends.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/breeds"
              className="btn btn-primary text-lg px-8 py-4"
            >
              Explore Breeds
            </Link>
            <Link
              href="/quiz"
              className="btn btn-secondary text-lg px-8 py-4"
            >
              Take the Quiz
            </Link>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Fun Facts Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Fascinating Dog Facts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="text-4xl mb-4">🐾</div>
              <h3 className="text-xl font-bold mb-3 text-primary">Nose Print Identity</h3>
              <p className="text-text/70">
                Just like human fingerprints, every dog&apos;s nose print is unique! Some countries even accept them as a form of identification.
              </p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">📨</div>
              <h3 className="text-xl font-bold mb-3 text-primary">Tail Talk</h3>
              <p className="text-text/70">
                A wagging tail isn&apos;t always a sign of happiness. The direction and height of the wag can reveal a lot about a dog&apos;s mood.
              </p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">👃</div>
              <h3 className="text-xl font-bold mb-3 text-primary">Super Sniffers</h3>
              <p className="text-text/70">
                A dog&apos;s sense of smell is up to 100,000 times more powerful than a human&apos;s. They can even smell emotions like fear.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz Teaser Section */}
      <section className="section bg-gradient-to-r from-primary to-accent">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text">Are You a Dog Expert?</h2>
          <p className="text-lg md:text-xl mb-8 text-text max-w-2xl mx-auto">
            Test your knowledge and see if you can identify different breeds and their unique traits.
          </p>
          <Link
            href="/quiz"
            className="btn bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4"
          >
            Take the Quiz
          </Link>
        </div>
      </section>

      {/* Educational Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Become a Better Dog Owner</h2>
          <div className="max-w-3xl mx-auto">
            <div className="card">
              <p className="text-lg text-text/70 mb-6 leading-relaxed">
                Learning about different dog breeds helps you understand their unique needs, temperaments, and health concerns. This knowledge empowers you to provide the best possible care for your furry friend.
              </p>
              <p className="text-lg text-text/70 leading-relaxed">
                Whether you&apos;re a seasoned dog owner or considering getting a new puppy, our resources will guide you on your journey to becoming a more informed and responsible pet parent.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dog Breeds Guide - Complete AKC Breed Directory & Quiz",
  description: "Test your dog breed knowledge with our interactive quiz! Explore 277+ AKC dog breeds, adoption listings, and find dog-friendly cafes near you.",
  openGraph: {
    title: "Dog Breeds Guide - Test Your Canine Knowledge",
    description: "Think you're a dog expert? Take our breed quiz and explore comprehensive breed information!",
    images: [{ url: "/hero1.jpg", width: 1200, height: 630 }],
  },
};

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="relative mb-12 sm:mb-16">
        <div className="bg-gradient-to-r from-primary to-accent text-white py-12 sm:py-16 px-6 sm:px-8 rounded-xl">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 text-center leading-tight">
            How Well Do You Know Dogs?
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-center max-w-3xl mx-auto opacity-90">
            Think you&apos;re a canine connoisseur? Let&apos;s put your knowledge to the test!
          </p>
          <div className="relative h-[250px] sm:h-[300px] md:h-[400px] rounded-xl overflow-hidden">
            <Image
              src="/hero1.jpg"
              alt="Happy dogs playing together - Dog breed quiz and information"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            />
          </div>
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="mb-12 sm:mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Link href="/breeds" className="group">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <h3 className="text-xl font-semibold mb-2 text-primary">🐕 Breed Directory</h3>
              <p className="text-gray-600">Explore 277+ AKC dog breeds</p>
            </div>
          </Link>
          <Link href="/quiz" className="group">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <h3 className="text-xl font-semibold mb-2 text-primary">🎯 Breed Quiz</h3>
              <p className="text-gray-600">Test your dog knowledge</p>
            </div>
          </Link>
          <Link href="/adoption" className="group">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <h3 className="text-xl font-semibold mb-2 text-primary">🏠 Adoption</h3>
              <p className="text-gray-600">Find your perfect companion</p>
            </div>
          </Link>
          <Link href="/cafes" className="group">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <h3 className="text-xl font-semibold mb-2 text-primary">☕ Dog Cafes</h3>
              <p className="text-gray-600">Find dog-friendly spots</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Fun Facts Section */}
      <section className="mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-primary">
          Did You Know? 🤔
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <article className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-primary">
              Nose Print Identity
            </h3>
            <p className="text-gray-600">
              Just like human fingerprints, every dog&apos;s nose print is unique! Some countries even accept nose prints as identification. 🐾
            </p>
          </article>
          <article className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-primary">
              Tail Communication
            </h3>
            <p className="text-gray-600">
              A wagging tail doesn&apos;t always mean happiness! The direction and height convey different emotions - it&apos;s like secret morse code! 📨
            </p>
          </article>
          <article className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-primary">
              Super Sniffers
            </h3>
            <p className="text-gray-600">
              Dogs can smell up to 100,000 times better than humans! That&apos;s like having a superpower for finding hidden treats! 👃
            </p>
          </article>
        </div>
      </section>

      {/* Quiz CTA Section */}
      <section className="mb-12 sm:mb-16">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-primary">
            Think You&apos;re a Dog Expert? 🏆
          </h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-gray-600 max-w-2xl mx-auto">
            Can you tell a Husky from a Malamute? Know which breed has a blue tongue?
            Ready to prove you&apos;re the ultimate dog whisperer?
          </p>
          <Link
            href="/quiz"
            className="inline-block bg-primary hover:bg-accent text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-colors duration-200 text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Start the interactive dog breed quiz"
          >
            Take the Dog Breed Quiz! 🎯
          </Link>
        </div>
      </section>

      {/* Educational Section */}
      <section className="mb-12 sm:mb-16">
        <div className="bg-secondary/20 p-6 sm:p-8 rounded-xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-primary text-center">
            Why Learn About Dogs? 🎓
          </h2>
          <div className="space-y-4 max-w-3xl mx-auto text-gray-600">
            <p className="text-base sm:text-lg">
              Understanding dogs isn&apos;t just fun - it&apos;s like learning a new language!
              When you know more about different breeds, their behaviors, and their needs,
              you become a better friend to our four-legged companions.
            </p>
            <p className="text-base sm:text-lg">
              Plus, did you know that some dogs can learn over 100 words?
              That&apos;s more vocabulary than some TV shows! 📺🐕
            </p>
            <p className="text-base sm:text-lg font-medium text-primary">
              Ready to test your canine knowledge and maybe learn something new?
              Our interactive quiz awaits! No treats required (but they&apos;re recommended) 🦴
            </p>
          </div>
        </div>
      </section>

      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Dog Breeds Guide",
            "description": "Complete AKC dog breed directory with interactive quiz and adoption listings",
            "url": "https://your-domain.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://your-domain.com/breeds?search={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
    </div>
  );
}
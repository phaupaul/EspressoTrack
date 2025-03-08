import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "The Ultimate Guide to Espresso Machine Maintenance",
    description: "Learn how to properly maintain your espresso machine to ensure consistent, exceptional espresso and extend your machine's lifespan.",
    content: `Proper espresso machine maintenance isn't just about preserving your investment—it's about ensuring every cup you brew achieves its full flavor potential. Whether you've just purchased your first home espresso machine or you're a seasoned barista, understanding how to care for your equipment is essential for consistent, exceptional espresso.

## Essential Maintenance Tools
- [Espresso Machine Cleaning Powder](https://www.amazon.com/Urnex-Espresso-Machine-Cleaning-Powder/dp/B001418KNS)
- [Group Head Brush](https://www.amazon.com/Pallo-Coffee-Tool-Group-Handle/dp/B004PN8QTE)
- [Microfiber Cleaning Cloths](https://www.amazon.com/AmazonBasics-Microfiber-Cleaning-Cloth-Pack/dp/B009FUF6DM)
...`,
  },
  {
    id: 2,
    title: "Exploring Single-Origin Espresso Beans",
    description: "Discover the unique characteristics and flavors of single-origin espresso beans from different regions around the world.",
    content: `While traditional espresso blends have long dominated the market, single-origin espresso beans have emerged as the coffee connoisseur's path to discovering distinct, terroir-driven flavor experiences. Let's explore why these region-specific beans are worth your attention and how they can transform your espresso ritual.
...`,
  },
  {
    id: 3,
    title: "The Science of Espresso Extraction",
    description: "Understand the complex chemistry and physics behind pulling the perfect espresso shot.",
    content: `The perfect espresso shot is a masterpiece of chemistry, physics, and precision. While brewing espresso might seem straightforward, the science behind extraction reveals why minor adjustments can dramatically impact your results.
...`,
  },
  {
    id: 4,
    title: "Finding Your Perfect Espresso Grinder",
    description: "A comprehensive guide to selecting the right grinder for your espresso journey.",
    content: `Ask any professional barista about the most important piece of equipment for exceptional espresso, and they'll likely point to the grinder before the espresso machine itself. Our recommended grinders include:

## Entry-Level Options
- [1Zpresso JX-Pro Manual Grinder](https://www.amazon.com/1Zpresso-JX-PRO-Adjustment-Stainless-Capacity/dp/B08QTXNV5B)
- [Baratza Sette 270](https://www.amazon.com/Baratza-Sette-270-Conical-Grinder/dp/B01KG9GBEC)

## Mid-Range Choices
- [Eureka Mignon Specialita](https://www.amazon.com/Eureka-Mignon-Specialita-Espresso-Grinder/dp/B07ZB6VR1X)
- [Niche Zero](https://www.nichecoffee.co.uk/)
...`,
  },
  {
    id: 5,
    title: "Dialing In Your Espresso: A Step-by-Step Guide",
    description: "Master the art of dialing in your espresso with our comprehensive guide to achieving perfect extraction.",
    content: `The process of "dialing in" espresso is what separates good shots from great ones. Whether you're working with a new coffee, adjusting to changing environmental conditions, or simply starting your day, understanding how to methodically adjust your variables is essential.

## Essential Equipment
- [Precision Scale](https://www.amazon.com/Timemore-Digital-Scale-Timer-Scales/dp/B07SJTXGN7)
- [Distribution Tool](https://www.amazon.com/Distributors-Distribution-Professional-Portafilter-MATOW/dp/B083LYKL8B)
- [Calibrated Tamper](https://www.amazon.com/Espresso-Tamper-Calibrated-Pressure-Stainless/dp/B07KN9J3NP)
...`,
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">EspressoTrack Blog</h1>
        </div>

        <div className="grid gap-6">
          {blogPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl">{post.title}</CardTitle>
                <CardDescription className="text-lg">
                  {post.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose prose-amber max-w-none">
                  <p className="text-muted-foreground mb-4">
                    {post.content.split('\n')[0]}
                  </p>
                  <Button variant="outline" className="flex items-center gap-2">
                    Read More
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
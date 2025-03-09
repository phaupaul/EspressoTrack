import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const blogPosts = [
  {
    id: 1,
    title: "The Ultimate Guide to Espresso Machine Maintenance",
    description: "Learn how to properly maintain your espresso machine to ensure consistent, exceptional espresso and extend your machine's lifespan.",
    content: `Proper espresso machine maintenance isn't just about preserving your investment—it's about ensuring every cup you brew achieves its full flavor potential. Whether you've just purchased your first home espresso machine or you're a seasoned barista, understanding how to care for your equipment is essential for consistent, exceptional espresso.

## Why Regular Maintenance Matters

Daily cleaning and periodic deep maintenance prevent scale buildup, ensure consistent water temperature, and maintain proper pressure—all critical factors for extracting the perfect shot. Neglect these routines, and you'll likely experience:

- Inconsistent extraction and poor-tasting espresso
- Reduced machine lifespan
- Costly repairs that could have been avoided
- Potential health concerns from bacteria growth

## Daily Maintenance Routine

**After Each Use:**
- Purge the steam wand immediately after use
- Wipe the steam wand with a clean, damp cloth
- Discard used coffee grounds
- Rinse the portafilter and basket

**End of Day:**
- Backflush your machine with water (for machines with 3-way solenoid valves)
- Clean the group head with a group head brush
- Empty and rinse the drip tray
- Wipe down the exterior of your machine

## Weekly Maintenance Tasks

- Backflush with espresso machine detergent
- Soak portafilter and basket in espresso detergent solution
- Clean the steam wand with dedicated cleaner
- Check and clean the group gasket

## Monthly and Quarterly Tasks

- Descale your machine (frequency depends on water hardness)
- Replace water filters if applicable
- Inspect for leaks or unusual sounds
- Clean inside the water reservoir

## Essential Maintenance Tools
- [Espresso Machine Cleaning Powder](https://www.amazon.com/Cafiza-Professional-Espresso-Machine-Cleaning/dp/B001418KR4)
- [Group Head Brush](https://www.amazon.com/Brushtech-B42C-Coffee-Grinder-Brush/dp/B0050MMJQ0)
- [Microfiber Cleaning Cloths](https://www.amazon.com/MR-SIGA-Microfiber-Cleaning-Pack-12-Size/dp/B07XP4GK8J)

## Descaling: The Essential Deep Clean

Scale buildup—the mineral deposits from water—is your espresso machine's greatest enemy. Even if you use filtered water, periodic descaling is necessary:

1. Choose the right descaling solution for your machine
2. Follow manufacturer guidelines precisely
3. Rinse thoroughly after descaling
4. Consider using a water softener if you live in a hard water area

## Professional Servicing: When to Call the Experts

Even with diligent home maintenance, professional servicing is recommended annually. Technicians can:

- Replace worn gaskets and seals
- Calibrate pressure and temperature
- Address internal scale buildup
- Preemptively replace parts showing wear

## Water Quality: The Overlooked Factor

The quality of water you use significantly impacts both your espresso's taste and your machine's longevity. Consider:

- Using filtered water with the right mineral content
- Testing your water hardness regularly
- Avoiding distilled water (espresso needs some minerals)
- Installing an in-line filtration system for serious enthusiasts

## Preventative Maintenance Calendar

Creating a maintenance calendar ensures nothing gets overlooked:

- Daily: Basic cleaning routines
- Weekly: Deep cleaning of removable parts
- Monthly: Descaling (adjust based on usage and water hardness)
- Quarterly: Filter replacements
- Annually: Professional servicing`,
  },
  {
    id: 2,
    title: "Exploring Single-Origin Espresso Beans",
    description: "Discover the unique characteristics and flavors of single-origin espresso beans from different regions around the world.",
    content: `While traditional espresso blends have long dominated the market, single-origin espresso beans have emerged as the coffee connoisseur's path to discovering distinct, terroir-driven flavor experiences. Let's explore why these region-specific beans are worth your attention and how they can transform your espresso ritual.

## What Makes Single-Origin Espresso Special?

Unlike blends that combine beans from multiple regions to create consistent flavor profiles, single-origin espresso offers:

- Traceability to a specific farm, cooperative, or region
- Distinct seasonal flavor characteristics
- Expression of unique growing conditions
- Direct connection to the farmers and their cultivation practices

## Top Single-Origin Regions for Outstanding Espresso

### Ethiopia: The Birthplace of Coffee

Ethiopian single-origin espresso often presents with:
- Bright, complex fruit notes (berries, citrus)
- Floral aromatics
- Wine-like acidity
- Medium body with honey or chocolate undertones

Try beans from Yirgacheffe, Sidamo, or Guji for an expressive, vibrant espresso experience.

### Colombia: Balance and Versatility

Colombian single-origins typically offer:
- Caramel sweetness
- Medium to full body
- Balanced acidity
- Notes of stone fruit, chocolate, and nuts

Regions like Huila, Nariño, and Antioquia produce exceptional beans that perform beautifully as espresso.

### Brazil: Body and Chocolate Notes

Brazilian single-origins are prized for:
- Low acidity
- Full body
- Pronounced chocolate notes
- Nutty character with caramel sweetness

These beans often make approachable, smooth espressos perfect for newcomers to single-origin exploration.

### Guatemala: Complex Sweetness

Guatemalan beans frequently exhibit:
- Chocolate and spice notes
- Medium to heavy body
- Subtle fruitiness
- Clean, slightly bright finish

Look for regions like Antigua, Huehuetenango, or Atitlán for complex yet balanced espresso shots.

## Brewing Considerations for Single-Origin Espresso

Single-origin beans often require different approaches than traditional blends:

- **Roast Levels**: Medium roasts often preserve the unique characteristics better than dark roasts
- **Grind Adjustments**: Each origin may require specific grind settings
- **Temperature Considerations**: Some origins extract better at slightly lower temperatures
- **Ratio Modifications**: Consider adjusting your coffee-to-water ratio to highlight specific flavor notes

## Seasonal Appreciation

Unlike blends formulated for consistency, single-origin espresso embraces seasonal variation. Coffee harvests occur at different times around the world, meaning:

- Fresh crop arrivals throughout the year
- Opportunity to experience how the same farm's coffee changes between harvests
- Deeper appreciation for coffee as an agricultural product

## Tasting and Appreciating Single-Origin Espresso

To fully experience these distinctive beans:

1. Start with a clean palate
2. Pull a slightly longer shot than you might for a blend
3. Try the espresso both straight and with a small amount of water (lungo style)
4. Note the aroma, initial taste, body, acidity, and finish
5. Keep a tasting journal to track your preferences

## Building a Single-Origin Rotation

Rather than settling on one favorite, consider building a rotation of 2-3 different single-origins to enjoy throughout the season. This approach:

- Broadens your palate
- Helps you identify your preferences
- Provides variety in your daily ritual
- Supports multiple coffee producers`,
  },
  {
    id: 3,
    title: "The Science of Espresso Extraction",
    description: "Understand the complex chemistry and physics behind pulling the perfect espresso shot.",
    content: `The perfect espresso shot is a masterpiece of chemistry, physics, and precision. While brewing espresso might seem straightforward, the science behind extraction reveals why minor adjustments can dramatically impact your results. Let's explore the fascinating scientific principles that transform ground coffee into liquid gold.

## The Chemistry of Coffee Extraction

At its core, espresso extraction is a complex chemical process where water acts as a solvent to dissolve and extract compounds from ground coffee:

### Primary Compounds Extracted:
- **Acids**: Extracted quickly, providing brightness and fruit notes
- **Sugars and Carbohydrates**: Contribute sweetness and body
- **Caffeine**: Bitter compound that extracts relatively early
- **Oils and Fats**: Create richness and carry aromatic compounds
- **Melanoidins**: Products of Maillard reactions during roasting that add color and body

### Extraction Timeline:
1. **Early extraction** (first 8-10 seconds): Primarily acids and caffeine
2. **Mid extraction** (10-20 seconds): Sugars, caramels, and balanced compounds
3. **Late extraction** (beyond 25 seconds): Predominantly bitter compounds and woody notes

## The Physics of Pressure and Flow

Espresso is unique because it relies on pressure to accelerate extraction:

### The Role of 9 Bars:
- Standard espresso machines operate at approximately 9 bars (130 psi)
- This pressure forces water through a densely packed coffee puck
- Higher pressure doesn't necessarily mean better extraction—it's about optimal flow

### The Importance of Resistance:
- The coffee puck creates necessary resistance
- Too little resistance (coarse grind) = under-extraction
- Too much resistance (fine grind) = over-extraction or channeling

### Flow Dynamics:
- Ideally, water flows evenly through the entire coffee puck
- Channeling occurs when water finds paths of least resistance
- Even tamping and proper distribution prevent channeling

## Temperature Variables

Temperature significantly influences which compounds extract and at what rate:

- **Standard range**: 195-205°F (90-96°C)
- **Higher temperatures**: Extract more compounds but risk bitter elements
- **Lower temperatures**: Extract fewer compounds but preserve delicate flavors
- **Temperature stability**: Critical for consistent shots

## The Mathematics of Extraction

Consistent espresso requires understanding key ratios and times:

### The Golden Ratio:
- Traditional: 1:2 (coffee to water)
- Ristretto: 1:1 (concentrated extraction)
- Lungo: 1:3 or 1:4 (extended extraction)

### Extraction Yield:
- Percentage of coffee solids dissolved in water
- Ideal range: 18-22% for balanced espresso
- Below 18%: Often under-extracted (sour, weak)
- Above 22%: Often over-extracted (bitter, astringent)

## Water Science and Mineral Content

Water isn't just a carrier—it's an active ingredient:

- **Ideal TDS (Total Dissolved Solids)**: 75-150 ppm
- **Calcium**: Enhances sweetness but contributes to scale
- **Magnesium**: Improves extraction of flavor compounds
- **Bicarbonates**: Buffer acidity but can flatten flavors
- **pH level**: Slightly alkaline water (7.0-7.5) typically works best`,
  },
  {
    id: 4,
    title: "Finding Your Perfect Espresso Grinder",
    description: "A comprehensive guide to selecting the right grinder for your espresso journey.",
    content: `Ask any professional barista about the most important piece of equipment for exceptional espresso, and they'll likely point to the grinder before the espresso machine itself. Let's explore how to select the perfect grinder to elevate your espresso experience.

## Why Grinder Quality Matters More Than You Think

The grinder's role in espresso preparation is foundational for several reasons:

- **Extraction surface area**: Grinding increases the surface area of coffee exposed to water, directly impacting extraction efficiency
- **Particle size distribution**: Consistent particle size ensures even extraction
- **Flow rate control**: Grind size is your primary variable for adjusting how quickly water passes through coffee
- **Freshness preservation**: Grinding immediately before brewing maximizes flavor potential

## Understanding Grinder Types

### Blade Grinders
**Verdict: Avoid for espresso**
- Use spinning blades to chop coffee
- Produce inconsistent particle sizes
- Cannot achieve the precision required for espresso
- Generate heat that can affect flavor

### Burr Grinders: The Only Real Option
Burr grinders use two abrading surfaces to crush coffee beans to a specific size:

#### Flat Burr Grinders
- Produce very consistent particle size
- Often preferred for medium to dark roasts
- Typically run at lower RPMs
- Can retain more grounds between uses
- Often found in commercial settings

#### Conical Burr Grinders
- Create slightly more varied particle distribution (which some prefer)
- Generally quieter operation
- Typically produce less heat
- Often more affordable in consumer models
- Usually have less retention

## Essential Features to Consider

### Burr Material and Quality
- **Steel burrs**: Sharp, precise, common in higher-end home grinders
- **Ceramic burrs**: Stay sharper longer, generate less heat
- **Titanium-coated burrs**: Exceptional durability, premium option

## Recommended Grinders by Price Range

### Entry-Level ($200-400)
- [Baratza Encore Conical Burr Grinder](https://www.amazon.com/Baratza-Encore-Conical-Coffee-Grinder/dp/B007F183LK)
- [Fellow Ode Brew Grinder](https://www.amazon.com/Fellow-Electric-Brewing-Stainless-Warranty/dp/B08FSCPZ64)

### Mid-Range ($400-800)
- [Eureka Mignon Silenzio](https://www.amazon.com/Eureka-Mignon-Silenzio-Coffee-Grinder/dp/B07P6FQPQ7)
- [DF64 Single Dose Grinder](https://www.amazon.com/Turin-Single-Espresso-Grinder-Standard/dp/B096KYFJ62)

### High-End ($800-1500)
- Eureka Atom
- Ceado E37S
- Lagom P64

### Commercial/Prosumer ($1500+)
- Mahlkönig E65S
- Monolith Flat
- EG-1`,
  },
  {
    id: 5,
    title: "Dialing In Your Espresso: A Step-by-Step Guide",
    description: "Master the art of dialing in your espresso with our comprehensive guide to achieving perfect extraction.",
    content: `The process of "dialing in" espresso is what separates good shots from great ones. Whether you're working with a new coffee, adjusting to changing environmental conditions, or simply starting your day, understanding how to methodically adjust your variables is essential.

## Essential Equipment for Precision

Before beginning the dialing-in process, ensure you have:

- [Timemore Black Mirror Basic Scale](https://www.amazon.com/TIMEMORE-Electronic-Precision-Sensors-Battery/dp/B094XKJVGH)
- [Normcore V4 Distribution Tool](https://www.amazon.com/Normcore-Distribution-Professional-Portafilter-MATOW/dp/B09KZQZ5YM)
- [Normcore Spring-Loaded Tamper](https://www.amazon.com/Normcore-Calibrated-Spring-Loaded-Portafilter-Professional/dp/B09B7HNXPX)
- A quality burr grinder
- A clean, properly maintained espresso machine
- Fresh coffee (ideally 7-21 days off roast for espresso)

## Step 1: Establish Your Starting Point

Begin with these baseline parameters:

- **Dose**: Typically 18g for a standard double basket (adjust based on your basket size)
- **Yield**: Aim for a 1:2 ratio (e.g., 18g coffee to 36g espresso)
- **Time**: Target 25-30 seconds of extraction
- **Grind**: Medium-fine (adjust from here)

## Step 2: Control Your Dose Precisely

1. Weigh your ground coffee to 0.1g precision
2. Ensure consistent dosing for each shot
3. Use WDT (Weiss Distribution Technique) tool or similar to evenly distribute grounds
4. Apply consistent tamping pressure (aim for level, not necessarily hard)

## Step 3: The Primary Adjustment—Grind Size

The grind size is your most powerful variable:

- **Too coarse**: Shot runs too quickly, tastes sour, thin, or weak
- **Too fine**: Shot runs too slowly, tastes bitter, ashy, or overly intense

Make incremental adjustments:
1. Start with your estimated grind setting
2. Pull a shot and time it
3. Adjust finer if too fast, coarser if too slow
4. Repeat until your target time/yield is achieved

## Step 4: Evaluating Extraction Quality

Once you've reached your target parameters, assess the quality:

### Visual Indicators:
- Flow should begin as slow drops, then develop into a steady stream
- Color should be deep brown, not blonde or black
- Crema should be golden-brown, not pale or excessively dark

### Taste Assessment:
- **Under-extracted**: Sour, sharp, lacking sweetness, disappears quickly
- **Over-extracted**: Bitter, dry, astringent, lingering unpleasant finish
- **Well-extracted**: Sweet, balanced, complex, pleasant finish`,
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
                  <Link href={`/blog/${post.id}`}>
                    <Button variant="outline" className="flex items-center gap-2">
                      Read More
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Creating districts and clubs from existing license data...");

  // Get all unique district-club combinations from existing licenses
  const licenses = await prisma.license.findMany({
    select: {
      id: true,
      district: true,
      clubName: true,
    },
  });

  console.log(`Found ${licenses.length} licenses to process`);

  // Group licenses by district and club
  const districtClubMap = new Map<string, Set<string>>();
  
  licenses.forEach(license => {
    if (!districtClubMap.has(license.district)) {
      districtClubMap.set(license.district, new Set());
    }
    districtClubMap.get(license.district)!.add(license.clubName);
  });

  console.log(`Found ${districtClubMap.size} districts`);

  // Create districts and clubs
  for (const [districtName, clubNames] of districtClubMap) {
    console.log(`\n📍 Creating district: ${districtName}`);
    
    const district = await prisma.district.create({
      data: { name: districtName }
    });

    for (const clubName of clubNames) {
      console.log(`  ⚽ Creating club: ${clubName}`);
      
      const club = await prisma.club.create({
        data: {
          name: clubName,
          districtId: district.id
        }
      });

      // Update licenses to link to this club
      const updatedLicenses = await prisma.license.updateMany({
        where: {
          district: districtName,
          clubName: clubName
        },
        data: {
          clubId: club.id
        }
      });

      console.log(`    ✅ Linked ${updatedLicenses.count} licenses to ${clubName}`);
    }
  }

  // Verify the results
  const totalDistricts = await prisma.district.count();
  const totalClubs = await prisma.club.count();
  const linkedLicenses = await prisma.license.count({
    where: {
      clubId: {
        not: null
      }
    }
  });

  console.log("\n🎉 Migration completed successfully!");
  console.log(`📊 Summary:`);
  console.log(`   - Districts created: ${totalDistricts}`);
  console.log(`   - Clubs created: ${totalClubs}`);
  console.log(`   - Licenses linked: ${linkedLicenses}`);
}

main()
  .catch((e) => {
    console.error("❌ Migration failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
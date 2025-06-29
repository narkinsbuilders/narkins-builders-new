# Component Update Script for SEO Image Optimization
# Save this as: update-components.ps1

Write-Host "=== Narkin's Builders SEO Image Optimization ===" -ForegroundColor Cyan
Write-Host "Updating component references to use SEO-optimized image names..." -ForegroundColor Yellow

# Define the image mapping (old name -> new SEO name)
$imageReplacements = @{
    # Homepage carousel images
    'NBR_SLIDE_1.webp' = 'narkins-boutique-residency-exterior-heritage-commercial-bahria-town.webp'
    'NBR_SLIDE_2.webp' = 'narkins-boutique-residency-amenities-pool-gym-facilities.webp'
    'NBR_SLIDE_3.webp' = 'narkins-boutique-residency-sky-villa-duplex-penthouse.webp'
    'NBR_SLIDE_4.webp' = 'narkins-boutique-residency-grand-lobby-reception-area.webp'
    
    # Hill Crest main images
    'hcr_new.webp' = 'hill-crest-residency-exterior-view-bahria-town-karachi.webp'
    
    # Hill Crest apartment gallery
    'hcr_appartment/hcr_apartment_slide_1.webp' = 'hill-crest-residency-apartment-interior-living-room-luxury.webp'
    'hcr_appartment/hcr_apartment_slide_2.webp' = 'hill-crest-residency-apartment-bedroom-master-suite.webp'
    'hcr_appartment/hcr_apartment_slide_3.webp' = 'hill-crest-residency-apartment-kitchen-modern-design.webp'
    'hcr_appartment/hcr_apartment_slide_4.webp' = 'hill-crest-residency-apartment-bathroom-luxury-fixtures.webp'
    'hcr_appartment/hcr_apartment_slide_5.webp' = 'hill-crest-residency-apartment-balcony-panoramic-view.webp'
    'hcr_appartment/hcr_apartment_slide_6.webp' = 'hill-crest-residency-apartment-dining-area-modern.webp'
    'hcr_appartment/hcr_apartment_slide_7.webp' = 'hill-crest-residency-apartment-guest-bedroom.webp'
    'hcr_appartment/hcr_apartment_slide_8.webp' = 'hill-crest-residency-apartment-guest-bathroom.webp'
    'hcr_appartment/hcr_apartment_slide_9.webp' = 'hill-crest-residency-apartment-storage-area.webp'
    'hcr_appartment/hcr_apartment_slide_10.webp' = 'hill-crest-residency-apartment-entrance-lobby.webp'
    'hcr_appartment/hcr_apartment_slide_11.webp' = 'hill-crest-residency-apartment-utility-room.webp'
    'hcr_appartment/hcr_apartment_slide_12.webp' = 'hill-crest-residency-apartment-family-lounge.webp'
    'hcr_appartment/hcr_apartment_slide_13.webp' = 'hill-crest-residency-apartment-powder-room.webp'
    
    # Hill Crest floor plans
    'hcr_appartment/DIAMOND PLAN.webp' = 'hill-crest-residency-2-bedroom-diamond-plan-1009-sqft.webp'
    'hcr_appartment/GOLD PLAN.webp' = 'hill-crest-residency-2-bedroom-gold-plan-933-sqft.webp'
    'hcr_appartment/SAPPHIRE PAGE.webp' = 'hill-crest-residency-2-bedroom-sapphire-plan-697-sqft.webp'
    'hcr_appartment/PLATINUM PLAN.webp' = 'hill-crest-residency-3-bedroom-platinum-plan-1490-sqft.webp'
    'hcr_appartment/RHODIUM PLAN.webp' = 'hill-crest-residency-4-bedroom-rhodium-plan-1996-sqft.webp'
    'hcr_appartment/SAPPHIRE A PAGE.webp' = 'hill-crest-residency-4-bedroom-sapphire-a-plan-1388-sqft.webp'
    
    # Hill Crest amenities
    'hcr-scaled/gym.webp' = 'hill-crest-residency-gym-fitness-center-modern-equipment.webp'
    'hcr-scaled/mosque.webp' = 'hill-crest-residency-prayer-area-mosque-facility.webp'
    'hcr-scaled/steam-bath.webp' = 'hill-crest-residency-steam-bath-spa-wellness-center.webp'
    'hcr-scaled/grand-lobby-for-hcr.webp' = 'hill-crest-residency-grand-lobby-reception-luxury.webp'
    
    # NBR floor plans
    'nbr_3d/gold_heritage _club_and_danzoo_safari_ view.webp' = 'narkins-boutique-residency-2-bedroom-gold-1547-sqft-heritage-view.webp'
    'nbr_3d/6.diamond_corner_heritage_club_and_danzoo_safari view.webp' = 'narkins-boutique-residency-3-bedroom-diamond-corner-2184-sqft.webp'
    'nbr_3d/Diamond-A-blue.webp' = 'narkins-boutique-residency-3-bedroom-diamond-a-2121-sqft.webp'
    'nbr_3d/Platinum A-1 Corner jinnah and theme park view.webp' = 'narkins-boutique-residency-4-bedroom-platinum-a1-corner-2670-sqft.webp'
    'nbr_3d/platinum_a-1_jinnah_and_danzoo_safari_view.webp' = 'narkins-boutique-residency-4-bedroom-platinum-a1-boulevard-2486-sqft.webp'
    'nbr_3d/4_platinum_a_jinnah_and_theme_park_view.webp' = 'narkins-boutique-residency-4-bedroom-platinum-a-2597-sqft.webp'
    
    # NBR amenities
    'nbr-scaled/gym.webp' = 'narkins-boutique-residency-gym-fitness-center.webp'
    'nbr-scaled/play-area.webp' = 'narkins-boutique-residency-kids-play-area.webp'
    'nbr-scaled/steam-bath.webp' = 'narkins-boutique-residency-steam-bath-wellness.webp'
    'nbr-scaled/reception.webp' = 'narkins-boutique-residency-grand-reception-lobby.webp'
    'nbr-scaled/snooker.webp' = 'narkins-boutique-residency-snooker-recreation-room.webp'
    'nbr-scaled/Lift-Shot.webp' = 'narkins-boutique-residency-high-speed-elevators.webp'
    'nbr-scaled/Pool.webp' = 'narkins-boutique-residency-swimming-pool-indoor.webp'
    'nbr-scaled/Seating.webp' = 'narkins-boutique-residency-community-hall-seating.webp'
    'nbr-scaled/underground-car-parking.webp' = 'narkins-boutique-residency-underground-parking-5-floors.webp'
    
    # NBR gallery
    'narkins_appartment_renamed_files/narkins_appartment_slide_1.webp' = 'narkins-boutique-residency-apartment-living-room-luxury.webp'
    'narkins_appartment_renamed_files/narkins_appartment_slide_2.webp' = 'narkins-boutique-residency-apartment-master-bedroom.webp'
    'narkins_appartment_renamed_files/narkins_appartment_slide_3.webp' = 'narkins-boutique-residency-apartment-kitchen-premium.webp'
    'narkins_appartment_renamed_files/narkins_appartment_slide_4.webp' = 'narkins-boutique-residency-apartment-bathroom-marble.webp'
    'narkins_appartment_renamed_files/narkins_appartment_slide_5.webp' = 'narkins-boutique-residency-apartment-balcony-heritage-view.webp'
    'narkins_appartment_renamed_files/narkins_appartment_slide_6.webp' = 'narkins-boutique-residency-apartment-dining-area.webp'
    'narkins_appartment_renamed_files/narkins_appartment_slide_7.webp' = 'narkins-boutique-residency-apartment-guest-room.webp'
    'narkins_appartment_renamed_files/narkins_appartment_slide_8.webp' = 'narkins-boutique-residency-apartment-powder-room.webp'
    'narkins_appartment_renamed_files/narkins_appartment_slide_9.webp' = 'narkins-boutique-residency-apartment-family-lounge.webp'
    'narkins_appartment_renamed_files/narkins_appartment_slide_10.webp' = 'narkins-boutique-residency-apartment-entrance-foyer.webp'
    'narkins_appartment_renamed_files/narkins_appartment_slide_11.webp' = 'narkins-boutique-residency-apartment-utility-area.webp'
    'narkins_appartment_renamed_files/narkins_appartment_slide_12.webp' = 'narkins-boutique-residency-apartment-walk-in-closet.webp'
    'narkins_appartment_renamed_files/narkins_appartment_slide_14.webp' = 'narkins-boutique-residency-apartment-study-room.webp'
    'narkins_appartment_renamed_files/narkins_appartment_slide_15.webp' = 'narkins-boutique-residency-apartment-storage-space.webp'
    'narkins_appartment_renamed_files/narkins_appartment_slide_16.webp' = 'narkins-boutique-residency-apartment-laundry-room.webp'
    
    # Completed projects
    'Al Arz Terrace.webp' = 'al-arz-terrace-completed-project-narkins-builders-karachi.webp'
    'Al Arz Homez.webp' = 'al-arz-homes-completed-project-narkins-builders-karachi.webp'
    'Ferere Town Project.webp' = 'palm-residency-completed-project-frere-town-karachi.webp'
    'Sharfabad_resized.webp' = 'classic-heights-completed-project-sharfabad-karachi.webp'
    
    # Company/About images
    'narkins_logo.webp' = 'narkins-builders-logo-30-years-experience.webp'
    'narkins-textile-industries.webp' = 'narkins-textile-industries-manufacturing-facility.webp'
    'eastern-wear.webp' = 'narkins-builders-eastern-wear-retail-outlet.webp'
    'reliability.webp' = 'smart-apartments-reliability-narkins-builders.webp'
    'smart-door-lock.webp' = 'smart-door-locks-narkins-apartments.webp'
    'smart-wifi-switches.webp' = 'smart-wifi-switches-narkins-residency.webp'
    
    # Navigation images
    'nbr_nav.jpeg' = 'narkins-boutique-residency-navigation-thumbnail.webp'
    
    # Launch/Progress images
    'hill-crest-residency-launch.webp' = 'hill-crest-residency-launch-ceremony-2021.webp'
    'hill-crest-residency-launch-2.webp' = 'hill-crest-residency-construction-progress-2024.webp'
    'nbr-march.webp' = 'narkins-boutique-residency-construction-march-2024.webp'
    'nbr-residency-sept.webp' = 'narkins-boutique-residency-construction-september-2023.webp'
}

# Files to update
$filesToUpdate = @(
    ".\src\pages\index.tsx",
    ".\src\pages\hill-crest-residency\index.tsx",
    ".\src\pages\narkins-boutique-residency\index.tsx", 
    ".\src\pages\about.tsx",
    ".\src\pages\completed-projects\index.tsx",
    ".\src\components\navigation\navigation.tsx",
    ".\src\components\footer\footer.tsx",
    ".\src\components\carousel-op\carousel-op.tsx"
)

# Function to update component files
function Update-ComponentFiles {
    Write-Host "Updating component files with SEO-optimized image references..." -ForegroundColor Yellow
    
    foreach ($file in $filesToUpdate) {
        if (Test-Path $file) {
            Write-Host "Processing: $file" -ForegroundColor Cyan
            $content = Get-Content $file -Raw
            $originalContent = $content
            $changesCount = 0
            
            # Replace image references
            foreach ($oldImage in $imageReplacements.Keys) {
                $newImage = $imageReplacements[$oldImage]
                
                # Replace various image reference patterns
                $patterns = @(
                    "/images/$oldImage",
                    "images/$oldImage",
                    "'$oldImage'",
                    "`"$oldImage`"",
                    "src=`"/images/$oldImage`"",
                    "src='/images/$oldImage'",
                    "src=`"images/$oldImage`"",
                    "src='images/$oldImage'"
                )
                
                foreach ($pattern in $patterns) {
                    $replacement = $pattern -replace [regex]::Escape($oldImage), $newImage
                    $beforeReplace = $content
                    $content = $content -replace [regex]::Escape($pattern), $replacement
                    if ($content -ne $beforeReplace) {
                        $changesCount++
                        Write-Host "    → Updated: $oldImage → $newImage" -ForegroundColor Green
                    }
                }
            }
            
            # Only write if content changed
            if ($content -ne $originalContent) {
                Set-Content -Path $file -Value $content -Encoding UTF8
                Write-Host "  ✓ Updated $changesCount image references" -ForegroundColor Green
            } else {
                Write-Host "  - No changes needed" -ForegroundColor Gray
            }
        } else {
            Write-Host "  ✗ File not found: $file" -ForegroundColor Red
        }
    }
}

# Main execution
Write-Host "`nStarting component update process..." -ForegroundColor White
Write-Host "This will update image references in your code to use SEO-optimized names.`n" -ForegroundColor White

$confirmation = Read-Host "Do you want to proceed? (y/N)"
if ($confirmation -eq 'y' -or $confirmation -eq 'Y') {
    Update-ComponentFiles
    
    Write-Host "`n=== Component Update Complete! ===" -ForegroundColor Cyan
    Write-Host "✅ Updated image references in all component files" -ForegroundColor Green
    Write-Host "✅ Your code now points to SEO-optimized image names" -ForegroundColor Green
    Write-Host "`nNext steps:" -ForegroundColor Yellow
    Write-Host "1. Test your website: npm run dev" -ForegroundColor White
    Write-Host "2. If everything works, proceed to rename actual image files" -ForegroundColor White
    Write-Host "3. Images will show as broken until you rename the actual files" -ForegroundColor White
    
} else {
    Write-Host "Operation cancelled." -ForegroundColor Red
}
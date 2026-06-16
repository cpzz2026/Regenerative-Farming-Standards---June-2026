import React, { useState, useMemo, useEffect } from "react";
import {
  Search, X, ArrowUpDown, AlertTriangle, Info, ChevronRight, ChevronDown,
  FileText, SlidersHorizontal, ExternalLink,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  DATA  (extracted verbatim from Regen_Requirement_Matrix_Phase1_v2 */
/*  — counts are never hard-coded; everything below is computed)       */
/* ------------------------------------------------------------------ */
const DATA = {"requirements":[{"Scheme":"Wildfarmed","Company Type":"Value chain / corporate","Requirement":"Cash crops grown with companion plants or as bi-/poly-crops","Broad Theme":"Crop rotation & diversity","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Practice-based","Source Citation":"Wildfarmed Regen Standards p.13 / DETAIL p.28","Status":"Verified","Notes":"Core mandatory practice"},{"Scheme":"Wildfarmed","Company Type":"Value chain / corporate","Requirement":"Overwinter cover crops where no overwinter cash crop; minimise bare soil; keep living roots","Broad Theme":"Cover crops & ground cover","Regen Principle":"Living Roots","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Practice-based","Source Citation":"DETAIL p.28-29","Status":"Verified","Notes":null},{"Scheme":"Wildfarmed","Company Type":"Value chain / corporate","Requirement":"Nitrogen capped at maximum 80 kg N/ha","Broad Theme":"Nutrient management","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory (cap)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"DETAIL p.29 / Appendix p.41","Status":"Partially verified","Notes":"INTERNAL UPDATE (per internal sources, Jun 2026): the nitrogen cap has since been INCREASED under Wildfarmed's updated standards. 80 kg N/ha is the figure in the supplied 2023 standard; the revised cap is not specified in available sources."},{"Scheme":"Wildfarmed","Company Type":"Value chain / corporate","Requirement":"Of the nitrogen applied, max 40 kg as granular, remainder foliar; doses no more than 40 kg","Broad Theme":"Nutrient management","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Practice-based","Source Citation":"Appendix p.41-43","Status":"Verified","Notes":"Corrects workbook '50/50 granular vs foliar'"},{"Scheme":"Wildfarmed","Company Type":"Value chain / corporate","Requirement":"Nutrition based on plant need via sap analysis (3 sap tests/season provided)","Broad Theme":"Nutrient management","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory (approach)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"DETAIL p.26, 29","Status":"Partially verified","Notes":"No mandated minimum test frequency"},{"Scheme":"Wildfarmed","Company Type":"Value chain / corporate","Requirement":"No insecticides permitted","Broad Theme":"Pesticide & IPM","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory (prohibition)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"DETAIL p.31","Status":"Verified","Notes":null},{"Scheme":"Wildfarmed","Company Type":"Value chain / corporate","Requirement":"No fungicides permitted","Broad Theme":"Pesticide & IPM","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory (prohibition)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"DETAIL p.31","Status":"Verified","Notes":null},{"Scheme":"Wildfarmed","Company Type":"Value chain / corporate","Requirement":"Herbicides restricted; glyphosate permitted for some uses but NOT as a pre-harvest desiccant","Broad Theme":"Pesticide & IPM","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory (restricted)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"DETAIL p.31 / Appendix p.44-45","Status":"Partially verified","Notes":"INTERNAL UPDATE (per internal sources, Jun 2026): glyphosate is now PERMITTED under Wildfarmed's updated standards (e.g. cover-crop termination), but is NOT allowed as a pre-harvest desiccant. The supplied 2023 standard (which bans all herbicides) predates this change; the updated standard is not in the evidence base."},{"Scheme":"Wildfarmed","Company Type":"Value chain / corporate","Requirement":"Integrate livestock into the cropping system at least once in a 3-year rotation","Broad Theme":"Livestock integration","Regen Principle":"Livestock Integration","Mandatory / Optional / Tiered":"Mandatory (soft 'ask')","Practice / Outcome / Evidence":"Practice-based","Source Citation":"DETAIL p.32","Status":"Verified","Notes":"WF can source 'flying herds'"},{"Scheme":"Wildfarmed","Company Type":"Value chain / corporate","Requirement":"Biological and structural soil tests at entry","Broad Theme":"Soil health & testing","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory (onboarding)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"COMMUNITY p.20-21","Status":"Partially verified","Notes":"No parameters/retest interval specified"},{"Scheme":"Wildfarmed","Company Type":"Value chain / corporate","Requirement":"Soilmentor account for in-field soil & biodiversity monitoring (free for >20ha)","Broad Theme":"Measurement & verification","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Optional / encouraged","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"DETAIL p.26","Status":"Partially verified","Notes":"Provided tool; use not strictly mandated"},{"Scheme":"Wildfarmed","Company Type":"Value chain / corporate","Requirement":"Brix readings encouraged","Broad Theme":"Measurement & verification","Regen Principle":"Context","Mandatory / Optional / Tiered":"Optional / encouraged","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"Appendix p.39","Status":"Verified","Notes":null},{"Scheme":"Wildfarmed","Company Type":"Value chain / corporate","Requirement":"Third-party audit by Control Union","Broad Theme":"Measurement & verification","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"DETAIL p.33","Status":"Verified","Notes":null},{"Scheme":"Wildfarmed","Company Type":"Value chain / corporate","Requirement":"Record-keeping limited to legally-required paperwork (sap tests, nutrition applications)","Broad Theme":"Measurement & verification","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory (minimal)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"DETAIL p.33","Status":"Verified","Notes":null},{"Scheme":"Wildfarmed","Company Type":"Value chain / corporate","Requirement":"Tillage permitted, no limit or restriction","Broad Theme":"Tillage & soil disturbance","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Optional (not restricted)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"DETAIL p.31","Status":"Verified","Notes":"'No herbicides inevitably means some tillage'"},{"Scheme":"Wildfarmed","Company Type":"Value chain / corporate","Requirement":"Low-input crop variety blends used; farm-saved varieties permitted","Broad Theme":"Crop rotation & diversity","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Optional","Practice / Outcome / Evidence":"Practice-based","Source Citation":"DETAIL p.27","Status":"Verified","Notes":null},{"Scheme":"Wildfarmed","Company Type":"Value chain / corporate","Requirement":"Work within a 3-year rotation/agreement; design cropping & soil management plan with Wildfarmed","Broad Theme":"Continuous improvement & farm plans","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Mandatory (structure)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"STANDARDS p.13 / COMMUNITY p.20","Status":"Verified","Notes":null},{"Scheme":"Regenified","Company Type":"Regen certification","Requirement":"Complete baseline evaluation and full soil testing on all tracts submitted for verification","Broad Theme":"Soil health & testing","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"6-3-4 Std 1.2.1-1.2.2","Status":"Verified","Notes":"Tier 1 entry"},{"Scheme":"Regenified","Company Type":"Regen certification","Requirement":"Begin developing a written regenerative plan if not already in place","Broad Theme":"Continuous improvement & farm plans","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"6-3-4 Std 1.2.3","Status":"Verified","Notes":"Tier 1 entry"},{"Scheme":"Regenified","Company Type":"Regen certification","Requirement":"Attend a multi-day regenerative agriculture educational workshop","Broad Theme":"Continuous improvement & farm plans","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Practice-based","Source Citation":"6-3-4 Std 1.2.4","Status":"Verified","Notes":"Tier 1 entry; participation not field practice"},{"Scheme":"Regenified","Company Type":"Regen certification","Requirement":"Apply regenerative practices to an increasing land share: T2 20-40%, T3 40-60%, T4 60-80%, T5 80-100%","Broad Theme":"Continuous improvement & farm plans","Regen Principle":"Context","Mandatory / Optional / Tiered":"Tiered","Practice / Outcome / Evidence":"Practice-based","Source Citation":"6-3-4 Std 1.3.1-1.6.1","Status":"Verified","Notes":"Central tiering mechanism"},{"Scheme":"Regenified","Company Type":"Regen certification","Requirement":"Farm plan approved by the Verification Review Board (Tier 2 and above)","Broad Theme":"Continuous improvement & farm plans","Regen Principle":"Context","Mandatory / Optional / Tiered":"Tiered","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"6-3-4 Std 1.3.2-1.6.2","Status":"Verified","Notes":null},{"Scheme":"Regenified","Company Type":"Regen certification","Requirement":"Plan must address the six Principles of Soil Health and three Rules of Adaptive Stewardship","Broad Theme":"Continuous improvement & farm plans","Regen Principle":"Context","Mandatory / Optional / Tiered":"Tiered","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"6-3-4 Std 1.3.3 / 2.1.1","Status":"Verified","Notes":null},{"Scheme":"Regenified","Company Type":"Regen certification","Requirement":"No more than three years in any single tier; advance or be dropped","Broad Theme":"Continuous improvement & farm plans","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"6-3-4 Std 1.1.3-1.1.5","Status":"Verified","Notes":"+1yr discretion for disasters"},{"Scheme":"Regenified","Company Type":"Regen certification","Requirement":"Develop a plan to reduce/mitigate major physical disturbance (tillage, grazing, haying)","Broad Theme":"Tillage & soil disturbance","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory (plan content)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"6-3-4 Std 2.3.1","Status":"Verified","Notes":null},{"Scheme":"Regenified","Company Type":"Regen certification","Requirement":"Tillage limits by tier: T2 reduce vs conventional; T3 <=1 tillage period/yr; T4 <=1 per 2yr; T5 <=1 per 4yr","Broad Theme":"Tillage & soil disturbance","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Tiered","Practice / Outcome / Evidence":"Practice-based","Source Citation":"6-3-4 Std 3.2.1","Status":"Verified","Notes":"Source says 'tillage period' (was 'passes')"},{"Scheme":"Regenified","Company Type":"Regen certification","Requirement":"No chemical pesticides on grains in the 21 days before harvest, incl. harvest-aid applications","Broad Theme":"Pesticide & IPM","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Practice-based","Source Citation":"6-3-4 Std 3.2.2","Status":"Verified","Notes":"Hard 'must'"},{"Scheme":"Regenified","Company Type":"Regen certification","Requirement":"Decrease pesticide use each year (active ingredient weight + applications) to advance a tier","Broad Theme":"Pesticide & IPM","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Tiered","Practice / Outcome / Evidence":"Outcome-based","Source Citation":"6-3-4 Std 3.2.3 / 3.2.13","Status":"Verified","Notes":null},{"Scheme":"Regenified","Company Type":"Regen certification","Requirement":"Develop a pest management plan before pesticide use","Broad Theme":"Pesticide & IPM","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mixed: mandatory (perennial) / expected (annual)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"6-3-4 Std 3.2.4 / 3.2.14","Status":"Verified","Notes":"Annual clause 'should', perennial 'must'"},{"Scheme":"Regenified","Company Type":"Regen certification","Requirement":"Maintain ground cover / soil armour thresholds by tier and rainfall zone","Broad Theme":"Cover crops & ground cover","Regen Principle":"Soil Cover","Mandatory / Optional / Tiered":"Tiered","Practice / Outcome / Evidence":"Practice-based","Source Citation":"6-3-4 Std 3.3.1","Status":"Verified","Notes":"Thresholds vary by rainfall zone"},{"Scheme":"Regenified","Company Type":"Regen certification","Requirement":"Re-establish bare soil (dig crops/land prep) to crop, cover crop or mulch within 2 weeks","Broad Theme":"Cover crops & ground cover","Regen Principle":"Soil Cover","Mandatory / Optional / Tiered":"Expected (should)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"6-3-4 Std 3.3.2","Status":"Verified","Notes":"Scoped to dig-harvest/land-prep"},{"Scheme":"Regenified","Company Type":"Regen certification","Requirement":"Three of five plant functional groups present across the rotation","Broad Theme":"Crop rotation & diversity","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Expected (should)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"6-3-4 Std 3.4.1","Status":"Verified","Notes":"Grasses/broadleaf (warm+cool)/woody"},{"Scheme":"Regenified","Company Type":"Regen certification","Requirement":"Crop rotation widens by tier: 2-crop (T2) to 5-crop (T5)","Broad Theme":"Crop rotation & diversity","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Tiered","Practice / Outcome / Evidence":"Practice-based","Source Citation":"6-3-4 Std 3.4.2","Status":"Verified","Notes":"Cover crops eligible if grown to harvest/anthesis"},{"Scheme":"Regenified","Company Type":"Regen certification","Requirement":"Track % of effective growing season with living roots","Broad Theme":"Cover crops & ground cover","Regen Principle":"Living Roots","Mandatory / Optional / Tiered":"Scored","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"6-3-4 Std 3.5.1","Status":"Verified","Notes":null},{"Scheme":"Regenified","Company Type":"Regen certification","Requirement":"Roots show rhizosheaths, abundance, branching, no restrictive layers","Broad Theme":"Soil health & testing","Regen Principle":"Context","Mandatory / Optional / Tiered":"Expected (should)","Practice / Outcome / Evidence":"Outcome-based","Source Citation":"6-3-4 Std 3.5.2-3.5.3","Status":"Verified","Notes":"Field indicator"},{"Scheme":"Regenified","Company Type":"Regen certification","Requirement":"Apply N, P and K at crop-removal rates or less, field-by-field","Broad Theme":"Nutrient management","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Expected / scored","Practice / Outcome / Evidence":"Practice-based","Source Citation":"6-3-4 Std 3.8.1","Status":"Verified","Notes":"Scored separately for N, P, K"},{"Scheme":"Regenified","Company Type":"Regen certification","Requirement":"Reduce nutrient application rates vs previous rotation across the whole farm","Broad Theme":"Nutrient management","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Expected / improvement trajectory","Practice / Outcome / Evidence":"Outcome-based","Source Citation":"6-3-4 Std 3.8.2","Status":"Verified","Notes":null},{"Scheme":"Regenified","Company Type":"Regen certification","Requirement":"Minimise N loss; edge-of-field nitrate below 10 ppm where standing water present","Broad Theme":"Water management","Regen Principle":"Context","Mandatory / Optional / Tiered":"Conditional","Practice / Outcome / Evidence":"Outcome-based","Source Citation":"6-3-4 Std 3.8.3","Status":"Verified","Notes":"Conditional on standing water"},{"Scheme":"Regenified","Company Type":"Regen certification","Requirement":"Assess water-cycle outcomes: aggregate stability, infiltration, compaction, no visible erosion/runoff, water-holding capacity","Broad Theme":"Water management","Regen Principle":"Context","Mandatory / Optional / Tiered":"Scored / evidence","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"6-3-4 Std 3.7.1-3.7.8","Status":"Verified","Notes":"Annual infiltration test"},{"Scheme":"Regenified","Company Type":"Regen certification","Requirement":"Lab tests improving: Haney respiration, Haney score, Loss-on-Ignition carbon, WEON","Broad Theme":"Soil health & testing","Regen Principle":"Context","Mandatory / Optional / Tiered":"Evidence-based","Practice / Outcome / Evidence":"Outcome-based","Source Citation":"6-3-4 Std 3.8.5-3.8.8","Status":"Verified","Notes":null},{"Scheme":"Regenified","Company Type":"Regen certification","Requirement":"Measure soil organic carbon with bulk density to 12 inches; increasing trend","Broad Theme":"Carbon / GHG","Regen Principle":"Context","Mandatory / Optional / Tiered":"Evidence-based","Practice / Outcome / Evidence":"Outcome-based","Source Citation":"6-3-4 Std 3.9.4","Status":"Verified","Notes":null},{"Scheme":"Regenified","Company Type":"Regen certification","Requirement":"Monitor WEOC and Microbially Active Carbon (MAC target 50-80) from Haney test","Broad Theme":"Carbon / GHG","Regen Principle":"Context","Mandatory / Optional / Tiered":"Evidence-based","Practice / Outcome / Evidence":"Outcome-based","Source Citation":"6-3-4 Std 3.9.5-3.9.6","Status":"Verified","Notes":null},{"Scheme":"Regenified","Company Type":"Regen certification","Requirement":"Plant species number increasing or exceeding 12 unique species vs prior year","Broad Theme":"Biodiversity & habitat","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Expected / improvement trajectory","Practice / Outcome / Evidence":"Outcome-based","Source Citation":"6-3-4 Std 3.10.1","Status":"Verified","Notes":null},{"Scheme":"Regenified","Company Type":"Regen certification","Requirement":"Evidence of beneficial organisms, wildlife, birds and invertebrates (timing-appropriate)","Broad Theme":"Biodiversity & habitat","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Conditional","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"6-3-4 Std 3.10.3-3.10.6","Status":"Verified","Notes":null},{"Scheme":"Regenified","Company Type":"Regen certification","Requirement":"PLFA tests: microbial biomass, AMF colonisation, fungal:bacterial ratio","Broad Theme":"Soil health & testing","Regen Principle":"Context","Mandatory / Optional / Tiered":"Evidence-based","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"6-3-4 Std 3.10.9-3.10.11","Status":"Verified","Notes":null},{"Scheme":"Regenified","Company Type":"Regen certification","Requirement":"Soil sampling protocol: 1 sample per 50-100 ha, georeferenced, initially and every 3 years, accredited labs","Broad Theme":"Soil health & testing","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory (cycle)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"6-3-4 Std 4.1.1-4.1.7","Status":"Verified","Notes":null},{"Scheme":"Regenified","Company Type":"Regen certification","Requirement":"Energy/fuel use per ha decreased vs prior year","Broad Theme":"Carbon / GHG","Regen Principle":"Context","Mandatory / Optional / Tiered":"Expected / scored","Practice / Outcome / Evidence":"Outcome-based","Source Citation":"6-3-4 Std 3.9.1-3.9.3","Status":"Verified","Notes":null},{"Scheme":"Regenified","Company Type":"Regen certification","Requirement":"Annual in-field evaluation; Field Verifier collects data, Verification Review Board confirms tier","Broad Theme":"Measurement & verification","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"6-3-4 Std 1.1.1 / 5.4.1-5.4.6","Status":"Verified","Notes":null},{"Scheme":"Regenified","Company Type":"Regen certification","Requirement":"Livestock: adaptive grazing plan + welfare/feed/antibiotic conditions where livestock present","Broad Theme":"Livestock integration","Regen Principle":"Livestock Integration","Mandatory / Optional / Tiered":"Optional / conditional","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"6-3-4 Std 2.7.1-2.7.4 / 3.6.x","Status":"Verified","Notes":"Explicitly optional if no livestock"},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"Written five-year Regenerative Plan, updated annually before audit","Broad Theme":"Continuous improvement & farm plans","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"AGW Std 1.10","Status":"Verified","Notes":null},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"Use the AGW Regenerative Plan Template","Broad Theme":"Continuous improvement & farm plans","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"AGW Std 1.8","Status":"Verified","Notes":null},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"Soil-health risk assessment, baseline using indicators, and monitoring","Broad Theme":"Soil health & testing","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"AGW Std 2.1","Status":"Verified","Notes":null},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"Soil-health assessment at least every 3 years using >=2 indicators from different categories","Broad Theme":"Soil health & testing","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"AGW Std 2.2","Status":"Verified","Notes":null},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"Tillage must minimise disturbance; reduce depth and frequency over time","Broad Theme":"Tillage & soil disturbance","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Practice-based","Source Citation":"AGW Std 2.3","Status":"Verified","Notes":null},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"Manage soil to prevent erosion","Broad Theme":"Soil health & testing","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Practice-based","Source Citation":"AGW Std 2.4","Status":"Verified","Notes":null},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"Manage soils to improve structure, biological activity, natural fertility","Broad Theme":"Soil health & testing","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Outcome-based","Source Citation":"AGW Std 2.5","Status":"Verified","Notes":null},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"Living plants present at least 11 months/year; bare soil not more than 1 month","Broad Theme":"Cover crops & ground cover","Regen Principle":"Soil Cover","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Practice-based","Source Citation":"AGW Std 2.6","Status":"Verified","Notes":null},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"Crop residues and manure returned to the soil","Broad Theme":"Nutrient management","Regen Principle":"Livestock Integration","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Practice-based","Source Citation":"AGW Std 2.7","Status":"Verified","Notes":null},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"Chemical soil sterilisation prohibited","Broad Theme":"Pesticide & IPM","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory (prohibition)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"AGW Std 2.9","Status":"Verified","Notes":null},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"Water-quality risk assessment, baseline and monitoring","Broad Theme":"Water management","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"AGW Std 3.1","Status":"Verified","Notes":null},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"Buffer zones maintained alongside all watercourses (risk-based width)","Broad Theme":"Water management","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Practice-based","Source Citation":"AGW Std 3.2","Status":"Verified","Notes":"No fixed numeric width"},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"No fertilisers or pesticides applied to buffer zones / non-cropped areas","Broad Theme":"Nutrient management","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Practice-based","Source Citation":"AGW Std 3.3","Status":"Verified","Notes":null},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"Protect existing riparian habitats; no alteration of watercourses without approval","Broad Theme":"Biodiversity & habitat","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Practice-based","Source Citation":"AGW Std 3.4","Status":"Verified","Notes":null},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"Use water sustainably; implement consumption-reduction plans where applicable","Broad Theme":"Water management","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory (where applicable)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"AGW Std 3.5","Status":"Verified","Notes":null},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"Monitor and record water extraction","Broad Theme":"Water management","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"AGW Std 3.6","Status":"Verified","Notes":null},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"Wastewater not discharged to watercourses; bunded/secure storage of chemicals/fuels","Broad Theme":"Water management","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Practice-based","Source Citation":"AGW Std 3.7","Status":"Verified","Notes":null},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"Air-quality risk assessment, baseline and monitoring","Broad Theme":"Carbon / GHG","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"AGW Std 4.1","Status":"Verified","Notes":null},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"Carbon footprint should be calculated at least annually","Broad Theme":"Carbon / GHG","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory (soft: 'should')","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"AGW Std 4.2","Status":"Partially verified","Notes":"Worded 'should' not 'must'"},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"Burning restricted to crop trash/untreated wood/plant material","Broad Theme":"Carbon / GHG","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory (conditional)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"AGW Std 4.3","Status":"Verified","Notes":null},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"Record total annual fuel use with efficiency-improvement plans","Broad Theme":"Carbon / GHG","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"AGW Std 4.4","Status":"Verified","Notes":null},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"Manure/slurry stored and applied to minimise GHG","Broad Theme":"Carbon / GHG","Regen Principle":"Livestock Integration","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Practice-based","Source Citation":"AGW Std 4.5","Status":"Verified","Notes":null},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"Energy strategy in plan (reduce consumption, renewables)","Broad Theme":"Carbon / GHG","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"AGW Std 4.6","Status":"Verified","Notes":null},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"Biodiversity risk assessment, baseline and monitoring","Broad Theme":"Biodiversity & habitat","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"AGW Std 5.1","Status":"Verified","Notes":null},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"Select >=1 biodiversity metric, survey annually, plan to increase biodiversity","Broad Theme":"Biodiversity & habitat","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"AGW Std 5.2","Status":"Verified","Notes":null},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"Map existing and proposed habitats; link wildlife corridors","Broad Theme":"Biodiversity & habitat","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Practice-based","Source Citation":"AGW Std 5.3","Status":"Verified","Notes":null},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"Protect pollinators (minimise pesticides, buffer zones, continuous pollen/nectar)","Broad Theme":"Biodiversity & habitat","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Practice-based","Source Citation":"AGW Std 5.4","Status":"Verified","Notes":null},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"Protect existing habitats; no clearing of old-growth forest; no draining of wetlands","Broad Theme":"Biodiversity & habitat","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Mandatory (prohibition)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"AGW Std 5.5","Status":"Verified","Notes":null},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"Control/remove invasive species threatening biodiversity","Broad Theme":"Biodiversity & habitat","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Mandatory (conditional)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"AGW Std 5.7","Status":"Verified","Notes":null},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"Crop rotation required to break pest/disease cycles and include fertility-building phases","Broad Theme":"Crop rotation & diversity","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Practice-based","Source Citation":"AGW Std 6.1","Status":"Verified","Notes":null},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"Perennial systems: diverse groundcovers / inter-row cropping / livestock integration","Broad Theme":"Crop rotation & diversity","Regen Principle":"Livestock Integration","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Practice-based","Source Citation":"AGW Std 6.2","Status":"Verified","Notes":null},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"Build soil fertility biologically rather than relying on synthetic inputs","Broad Theme":"Nutrient management","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Practice-based","Source Citation":"AGW Std 6.3","Status":"Verified","Notes":null},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"Bought-in fertility inputs justified, aligned to crop demand, reduced over time","Broad Theme":"Nutrient management","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory (conditional)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"AGW Std 6.4","Status":"Verified","Notes":"NO numeric N cap exists"},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"Weeds managed primarily by cultural control; chemical control only when justified, not routine","Broad Theme":"Pesticide & IPM","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Practice-based","Source Citation":"AGW Std 6.5","Status":"Verified","Notes":null},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"Grazing management plan (rest periods, hard/emergency grazing justified)","Broad Theme":"Livestock integration","Regen Principle":"Livestock Integration","Mandatory / Optional / Tiered":"Mandatory (where livestock)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"AGW Std 6.6","Status":"Verified","Notes":null},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"Natural grasslands not ploughed, reseeded, fertilised or sprayed","Broad Theme":"Biodiversity & habitat","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Mandatory (prohibition)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"AGW Std 6.8","Status":"Verified","Notes":null},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"New pasture seed mixtures include legumes for nitrogen fixation","Broad Theme":"Crop rotation & diversity","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Practice-based","Source Citation":"AGW Std 6.9","Status":"Verified","Notes":null},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"Maintain trees/hedgerows; increase where appropriate; no removal of native features without reason","Broad Theme":"Biodiversity & habitat","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Practice-based","Source Citation":"AGW Std 6.10","Status":"Verified","Notes":null},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"Agrochemical operators trained/competent; follow label, PPE, min interval to harvest","Broad Theme":"Pesticide & IPM","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Practice-based","Source Citation":"AGW Std 6.11","Status":"Verified","Notes":null},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"Agrochemicals stored/labelled safely; accurate purchase and use records","Broad Theme":"Pesticide & IPM","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"AGW Std 6.12","Status":"Verified","Notes":null},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"Buffer zones established when agrochemicals are used","Broad Theme":"Pesticide & IPM","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory (conditional)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"AGW Std 6.13","Status":"Verified","Notes":null},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"ICM section completed and approved before any crop-protection product (incl. seed treatments); reduction toward elimination","Broad Theme":"Pesticide & IPM","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"AGW Std 6.14","Status":"Verified","Notes":null},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"Neonicotinoids prohibited","Broad Theme":"Pesticide & IPM","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory (prohibition)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"AGW Annex A","Status":"Verified","Notes":null},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"Pre-harvest crop termination/desiccation agrochemicals prohibited","Broad Theme":"Pesticide & IPM","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory (prohibition)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"AGW Annex A","Status":"Verified","Notes":null},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"Synthetic/mineral fertilisers restricted; phased toward elimination","Broad Theme":"Nutrient management","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Tiered (restricted)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"AGW Annex A","Status":"Verified","Notes":"No rate cap; restricted-and-phased"},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"GMOs prohibited","Broad Theme":"Nutrient management","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory (prohibition)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"AGW Std 1.4 / Annex A","Status":"Verified","Notes":null},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"Records reviewed annually, retained at least 5 years, available to auditor","Broad Theme":"Measurement & verification","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"AGW Std 1.12","Status":"Verified","Notes":null},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"Annual third-party audit (ISO/IEC 17065 principles)","Broad Theme":"Measurement & verification","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"AGW Intro p.5","Status":"Verified","Notes":null},{"Scheme":"A Greener World","Company Type":"Regen certification","Requirement":"Where livestock present, Certified Animal Welfare Approved status within 3 years","Broad Theme":"Livestock integration","Regen Principle":"Livestock Integration","Mandatory / Optional / Tiered":"Mandatory (conditional)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"AGW Std (livestock)","Status":"Verified","Notes":null},{"Scheme":"regenagri","Company Type":"Regen certification","Requirement":"Achieve a minimum 65% score plus all mandatory criteria to certify","Broad Theme":"Measurement & verification","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Outcome-based","Source Citation":"Std Assessment methodology p.9","Status":"Verified","Notes":null},{"Scheme":"regenagri","Company Type":"Regen certification","Requirement":"Score must improve annually to retain certification; monitored annually","Broad Theme":"Continuous improvement & farm plans","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Outcome-based","Source Citation":"Std p.9","Status":"Verified","Notes":null},{"Scheme":"regenagri","Company Type":"Regen certification","Requirement":"Conservation tillage on at least 20% of arable land (max depth 20cm, >=30% residue)","Broad Theme":"Tillage & soil disturbance","Regen Principle":"Soil Cover","Mandatory / Optional / Tiered":"Mandatory + scored","Practice / Outcome / Evidence":"Practice-based","Source Citation":"Std S5.2 p.31","Status":"Verified","Notes":"Scored higher for more"},{"Scheme":"regenagri","Company Type":"Regen certification","Requirement":"Cover crops on soils that would otherwise be bare","Broad Theme":"Cover crops & ground cover","Regen Principle":"Soil Cover","Mandatory / Optional / Tiered":"Mandatory (apply) + scored","Practice / Outcome / Evidence":"Practice-based","Source Citation":"Std S5.1 p.30","Status":"Verified","Notes":"Top tier >=5 species incl. legume"},{"Scheme":"regenagri","Company Type":"Regen certification","Requirement":"Diverse crop rotation on at least 75% of arable land","Broad Theme":"Crop rotation & diversity","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Mandatory + scored","Practice / Outcome / Evidence":"Practice-based","Source Citation":"Std S5.3 p.32","Status":"Verified","Notes":"Scored by crop count"},{"Scheme":"regenagri","Company Type":"Regen certification","Requirement":"Inter-/multi-cropping on a percentage of cropland","Broad Theme":"Crop rotation & diversity","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Optional + scored","Practice / Outcome / Evidence":"Practice-based","Source Citation":"Std S5.4 p.33","Status":"Verified","Notes":null},{"Scheme":"regenagri","Company Type":"Regen certification","Requirement":"Nutrient management plan increasing organic/natural inputs","Broad Theme":"Nutrient management","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory + scored","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"Std S5.6 p.35","Status":"Verified","Notes":null},{"Scheme":"regenagri","Company Type":"Regen certification","Requirement":"Documented synthetic fertiliser reduction over a 3-year period vs baseline","Broad Theme":"Nutrient management","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory + scored","Practice / Outcome / Evidence":"Outcome-based","Source Citation":"Std S5.7 p.36","Status":"Verified","Notes":null},{"Scheme":"regenagri","Company Type":"Regen certification","Requirement":"Integrated Pest Management plan implemented on more than 15% of land","Broad Theme":"Pesticide & IPM","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory + scored","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"Std S5.8 p.37","Status":"Verified","Notes":null},{"Scheme":"regenagri","Company Type":"Regen certification","Requirement":"Documented synthetic pesticide reduction over the 3-year cycle vs baseline; HHP phase-out","Broad Theme":"Pesticide & IPM","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory + scored","Practice / Outcome / Evidence":"Outcome-based","Source Citation":"Std S5.9 p.38","Status":"Verified","Notes":"Points deducted for HHP use"},{"Scheme":"regenagri","Company Type":"Regen certification","Requirement":"Soil analysis at least every 3 years; maintain a soil management plan","Broad Theme":"Soil health & testing","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory + scored","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"Std S5.11 p.42","Status":"Verified","Notes":null},{"Scheme":"regenagri","Company Type":"Regen certification","Requirement":"Biodiversity plan plus at least one biodiversity practice","Broad Theme":"Biodiversity & habitat","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Mandatory + scored","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"Std S7.1 p.52","Status":"Verified","Notes":null},{"Scheme":"regenagri","Company Type":"Regen certification","Requirement":"At least two landscape management practices (hedgerows / conservation / afforestation / buffers)","Broad Theme":"Biodiversity & habitat","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Practice-based","Source Citation":"Std methodology p.9","Status":"Verified","Notes":null},{"Scheme":"regenagri","Company Type":"Regen certification","Requirement":"Buffers around watercourses (scored by width)","Broad Theme":"Water management","Regen Principle":"Context","Mandatory / Optional / Tiered":"Optional + scored","Practice / Outcome / Evidence":"Practice-based","Source Citation":"Std S7.2 p.53","Status":"Verified","Notes":"Counts toward min-2 landscape practices"},{"Scheme":"regenagri","Company Type":"Regen certification","Requirement":"Hedgerows / windbreaks (scored)","Broad Theme":"Biodiversity & habitat","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Optional + scored","Practice / Outcome / Evidence":"Practice-based","Source Citation":"Std S7.3 p.54","Status":"Verified","Notes":null},{"Scheme":"regenagri","Company Type":"Regen certification","Requirement":"Conservation of natural habitat (scored)","Broad Theme":"Biodiversity & habitat","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Optional + scored","Practice / Outcome / Evidence":"Practice-based","Source Citation":"Std S7.4 p.55","Status":"Verified","Notes":null},{"Scheme":"regenagri","Company Type":"Regen certification","Requirement":"Afforestation / net tree gain (scored)","Broad Theme":"Biodiversity & habitat","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Optional + scored","Practice / Outcome / Evidence":"Outcome-based","Source Citation":"Std S7.5 p.56","Status":"Verified","Notes":null},{"Scheme":"regenagri","Company Type":"Regen certification","Requirement":"Wastewater/water management plan; water analysis if >500ha or applying synthetic inputs","Broad Theme":"Water management","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory + scored","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"Std S8.1 p.58","Status":"Verified","Notes":null},{"Scheme":"regenagri","Company Type":"Regen certification","Requirement":"Irrigation efficiency measures + water/irrigation plan where irrigating","Broad Theme":"Water management","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory if irrigating + scored","Practice / Outcome / Evidence":"Practice-based","Source Citation":"Std S5.10 p.40","Status":"Verified","Notes":null},{"Scheme":"regenagri","Company Type":"Regen certification","Requirement":"Rainwater harvesting (scored)","Broad Theme":"Water management","Regen Principle":"Context","Mandatory / Optional / Tiered":"Optional + scored","Practice / Outcome / Evidence":"Practice-based","Source Citation":"Std S8.3 p.60","Status":"Verified","Notes":null},{"Scheme":"regenagri","Company Type":"Regen certification","Requirement":"Renewable energy share accounted/reported (scored)","Broad Theme":"Carbon / GHG","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory (report) + scored","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"Std S8.4 p.61","Status":"Verified","Notes":null},{"Scheme":"regenagri","Company Type":"Regen certification","Requirement":"GHG emissions calculator; third-party verification following ISO 14064/5","Broad Theme":"Carbon / GHG","Regen Principle":"Context","Mandatory / Optional / Tiered":"Optional","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"Std S9.1 p.63","Status":"Verified","Notes":"Voluntary, for carbon-credit access"},{"Scheme":"regenagri","Company Type":"Regen certification","Requirement":"Annual third-party certification audit","Broad Theme":"Measurement & verification","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"Std Intro p.8","Status":"Verified","Notes":null},{"Scheme":"Soil Association Organic","Company Type":"Regen certification","Requirement":"Synthetic / soluble mineral nitrogen fertilisers prohibited","Broad Theme":"Nutrient management","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory (prohibition)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"SA GB 2.4.1(4) p.76","Status":"Verified","Notes":null},{"Scheme":"Soil Association Organic","Company Type":"Regen certification","Requirement":"Manure nitrogen capped at 170 kg N/ha/yr averaged over the holding","Broad Theme":"Nutrient management","Regen Principle":"Livestock Integration","Mandatory / Optional / Tiered":"Mandatory (cap)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"SA GB 2.5.6 p.84","Status":"Verified","Notes":"Per-field guidance ceiling 250 kg N/ha"},{"Scheme":"Soil Association Organic","Company Type":"Regen certification","Requirement":"Synthetic pesticides and herbicides effectively prohibited (only natural/biological permitted)","Broad Theme":"Pesticide & IPM","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Practice-based","Source Citation":"SA GB 2.6.2-2.6.3 p.87","Status":"Verified","Notes":"Permitted only on established threat"},{"Scheme":"Soil Association Organic","Company Type":"Regen certification","Requirement":"Pest/weed control rely primarily on organic preventative measures","Broad Theme":"Pesticide & IPM","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Practice-based","Source Citation":"SA GB 2.6.1 p.86","Status":"Verified","Notes":"Resistant varieties, rotation, mechanical weeding"},{"Scheme":"Soil Association Organic","Company Type":"Regen certification","Requirement":"SOM, fertility and biological activity must be maintained and increased","Broad Theme":"Soil health & testing","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Outcome-based","Source Citation":"SA GB 2.4.1(2) p.76","Status":"Verified","Notes":"Via rotation, legumes, green manures, manure"},{"Scheme":"Soil Association Organic","Company Type":"Regen certification","Requirement":"Manage soils for soil health (life, fertility, structure, biodiversity)","Broad Theme":"Soil health & testing","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Outcome-based","Source Citation":"SA GB 2.4.1(1) p.76","Status":"Verified","Notes":null},{"Scheme":"Soil Association Organic","Company Type":"Regen certification","Requirement":"Soil managed to prevent compaction, erosion and run-off","Broad Theme":"Water management","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Outcome-based","Source Citation":"SA GB 2.4.1(3) p.76","Status":"Verified","Notes":null},{"Scheme":"Soil Association Organic","Company Type":"Regen certification","Requirement":"Varied crop rotation required as primary fertility and pest tool","Broad Theme":"Crop rotation & diversity","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Mandatory (where feasible)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"SA GB 2.4.1(2)(a) p.76","Status":"Verified","Notes":"No minimum rotation length prescribed"},{"Scheme":"Soil Association Organic","Company Type":"Regen certification","Requirement":"Legumes / green manures required as primary fertility means","Broad Theme":"Cover crops & ground cover","Regen Principle":"Soil Cover","Mandatory / Optional / Tiered":"Mandatory means","Practice / Outcome / Evidence":"Practice-based","Source Citation":"SA GB 2.4.1(2)(b)(c) p.76","Status":"Verified","Notes":null},{"Scheme":"Soil Association Organic","Company Type":"Regen certification","Requirement":"Tillage method/frequency not prescribed (ploughing species-rich grassland prohibited)","Broad Theme":"Tillage & soil disturbance","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Not prescribed","Practice / Outcome / Evidence":"Practice-based","Source Citation":"SA GB 2.3.1","Status":"Verified (absence)","Notes":null},{"Scheme":"Soil Association Organic","Company Type":"Regen certification","Requirement":"Hydroponic production prohibited (soil-based growing required)","Broad Theme":"Soil health & testing","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory (prohibition)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"SA GB 2.4.2 p.77","Status":"Verified","Notes":null},{"Scheme":"Soil Association Organic","Company Type":"Regen certification","Requirement":"Production must contribute to high biodiversity; protect significant habitats","Broad Theme":"Biodiversity & habitat","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Outcome-based","Source Citation":"SA GB 2.3.1 p.72","Status":"Verified","Notes":null},{"Scheme":"Soil Association Organic","Company Type":"Regen certification","Requirement":"Preventative measures to prevent pollution and run-off (slurry storage, nutrient loss)","Broad Theme":"Water management","Regen Principle":"Livestock Integration","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Practice-based","Source Citation":"SA GB 2.3.2 p.73","Status":"Verified","Notes":null},{"Scheme":"Soil Association Organic","Company Type":"Regen certification","Requirement":"Use energy/water/resources responsibly; minimise non-renewable and off-farm inputs","Broad Theme":"Carbon / GHG","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Outcome-based","Source Citation":"SA GB 2.3.3 p.75","Status":"Verified","Notes":null},{"Scheme":"Soil Association Organic","Company Type":"Regen certification","Requirement":"GMOs prohibited; non-GM declaration required","Broad Theme":"Nutrient management","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory (prohibition)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"SA GB 1.11.2 p.41","Status":"Verified","Notes":null},{"Scheme":"Soil Association Organic","Company Type":"Regen certification","Requirement":"Plant production records register (fertiliser, pesticides, inputs, harvest)","Broad Theme":"Measurement & verification","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"SA GB 1.7.4 p.20","Status":"Verified","Notes":null},{"Scheme":"Soil Association Organic","Company Type":"Regen certification","Requirement":"Annual cropping plan by parcel","Broad Theme":"Continuous improvement & farm plans","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"SA GB 1.7.5 p.20","Status":"Verified","Notes":null},{"Scheme":"Soil Association Organic","Company Type":"Regen certification","Requirement":"Annual physical inspection (plus >=10% unannounced/risk-based)","Broad Theme":"Measurement & verification","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"SA GB 1.5.1 p.15","Status":"Verified","Notes":null},{"Scheme":"Soil Association Organic","Company Type":"Regen certification","Requirement":"Conversion period (24 months arable/grass; 36 months perennial)","Broad Theme":"Continuous improvement & farm plans","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Practice-based","Source Citation":"SA GB 2.1.2 p.64","Status":"Verified","Notes":"Gates entry to organic status"},{"Scheme":"Pladis","Company Type":"Value chain / corporate","Requirement":"Points-based tiered scheme (Bronze/Silver/Gold); no single practice mandatory; payment scales with tier (Silver GBP80/ha, 2025)","Broad Theme":"Continuous improvement & farm plans","Regen Principle":"Context","Mandatory / Optional / Tiered":"Tiered / menu","Practice / Outcome / Evidence":"Practice-based","Source Citation":"Farmers Weekly, Impey, 20 Oct 2025 (secondary)","Status":"Verified","Notes":"Run by Frontier"},{"Scheme":"Pladis","Company Type":"Value chain / corporate","Requirement":"No-till (8 points)","Broad Theme":"Tillage & soil disturbance","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Optional (incentivised)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"FW points table (secondary)","Status":"Verified","Notes":null},{"Scheme":"Pladis","Company Type":"Value chain / corporate","Requirement":"Reduced/min till (4 points)","Broad Theme":"Tillage & soil disturbance","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Optional (incentivised)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"FW points table (secondary)","Status":"Verified","Notes":null},{"Scheme":"Pladis","Company Type":"Value chain / corporate","Requirement":"Cover crop following harvest (4 points)","Broad Theme":"Cover crops & ground cover","Regen Principle":"Soil Cover","Mandatory / Optional / Tiered":"Optional (incentivised)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"FW points table (secondary)","Status":"Verified","Notes":null},{"Scheme":"Pladis","Company Type":"Value chain / corporate","Requirement":"Catch crop ahead of establishment (4 points)","Broad Theme":"Cover crops & ground cover","Regen Principle":"Soil Cover","Mandatory / Optional / Tiered":"Optional (incentivised)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"FW points table (secondary)","Status":"Verified","Notes":null},{"Scheme":"Pladis","Company Type":"Value chain / corporate","Requirement":"Overwinter stubble following harvest (1 point)","Broad Theme":"Cover crops & ground cover","Regen Principle":"Soil Cover","Mandatory / Optional / Tiered":"Optional (incentivised)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"FW points table (secondary)","Status":"Verified","Notes":null},{"Scheme":"Pladis","Company Type":"Value chain / corporate","Requirement":"3 / 4 / 5+ crops in rotation (3 / 4 / 5 points)","Broad Theme":"Crop rotation & diversity","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Optional (incentivised)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"FW points table (secondary)","Status":"Verified","Notes":null},{"Scheme":"Pladis","Company Type":"Value chain / corporate","Requirement":"Legume break crop (2 points) / legume fallow (3 points)","Broad Theme":"Crop rotation & diversity","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Optional (incentivised)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"FW points table (secondary)","Status":"Verified","Notes":null},{"Scheme":"Pladis","Company Type":"Value chain / corporate","Requirement":"Legume companion crop (1 point)","Broad Theme":"Crop rotation & diversity","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Optional (incentivised)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"FW points table (secondary)","Status":"Verified","Notes":null},{"Scheme":"Pladis","Company Type":"Value chain / corporate","Requirement":"Variable-rate nitrogen (2 points)","Broad Theme":"Nutrient management","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Optional (incentivised)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"FW points table (secondary)","Status":"Verified","Notes":null},{"Scheme":"Pladis","Company Type":"Value chain / corporate","Requirement":"Biostimulants to improve N efficiency (3 points)","Broad Theme":"Nutrient management","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Optional (incentivised)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"FW points table (secondary)","Status":"Verified","Notes":null},{"Scheme":"Pladis","Company Type":"Value chain / corporate","Requirement":"Nitrification inhibitors (4 points)","Broad Theme":"Nutrient management","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Optional (incentivised)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"FW points table (secondary)","Status":"Verified","Notes":null},{"Scheme":"Pladis","Company Type":"Value chain / corporate","Requirement":"Organo-mineral fertiliser (5 points)","Broad Theme":"Nutrient management","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Optional (incentivised)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"FW points table (secondary)","Status":"Verified","Notes":null},{"Scheme":"Pladis","Company Type":"Value chain / corporate","Requirement":"Low-carbon fertiliser (3 points)","Broad Theme":"Nutrient management","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Optional (incentivised)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"FW points table (secondary)","Status":"Verified","Notes":null},{"Scheme":"Pladis","Company Type":"Value chain / corporate","Requirement":"Straw chopped and incorporated (2 points)","Broad Theme":"Nutrient management","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Optional (incentivised)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"FW points table (secondary)","Status":"Verified","Notes":null},{"Scheme":"Pladis","Company Type":"Value chain / corporate","Requirement":"Soil grid sampling pH/P/K/Mg (2 points)","Broad Theme":"Soil health & testing","Regen Principle":"Context","Mandatory / Optional / Tiered":"Optional (incentivised)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"FW points table (secondary)","Status":"Verified","Notes":null},{"Scheme":"Pladis","Company Type":"Value chain / corporate","Requirement":"Soil organic matter measurement (1 point)","Broad Theme":"Soil health & testing","Regen Principle":"Context","Mandatory / Optional / Tiered":"Optional (incentivised)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"FW points table (secondary)","Status":"Verified","Notes":null},{"Scheme":"Pladis","Company Type":"Value chain / corporate","Requirement":"IPM plan (1 point)","Broad Theme":"Pesticide & IPM","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Optional (incentivised)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"FW points table (secondary)","Status":"Verified","Notes":null},{"Scheme":"Pladis","Company Type":"Value chain / corporate","Requirement":"Soil management plan (1 point)","Broad Theme":"Continuous improvement & farm plans","Regen Principle":"Context","Mandatory / Optional / Tiered":"Optional (incentivised)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"FW points table (secondary)","Status":"Verified","Notes":null},{"Scheme":"Pladis","Company Type":"Value chain / corporate","Requirement":"Nutrient management plan (1 point)","Broad Theme":"Continuous improvement & farm plans","Regen Principle":"Context","Mandatory / Optional / Tiered":"Optional (incentivised)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"FW points table (secondary)","Status":"Verified","Notes":null},{"Scheme":"Pladis","Company Type":"Value chain / corporate","Requirement":"Field grain analysis (1 point); crop carbon footprint (1 point)","Broad Theme":"Carbon / GHG","Regen Principle":"Context","Mandatory / Optional / Tiered":"Optional (incentivised)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"FW points table (secondary)","Status":"Verified","Notes":null},{"Scheme":"Pladis","Company Type":"Value chain / corporate","Requirement":"Farmland habitat 3% / 5% / 7%+ of farmed area (3 / 4 / 5 points)","Broad Theme":"Biodiversity & habitat","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Optional (incentivised)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"FW points table (secondary)","Status":"Verified","Notes":null},{"Scheme":"Pladis","Company Type":"Value chain / corporate","Requirement":"Supply data and reporting to the scheme","Broad Theme":"Measurement & verification","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"FW article (secondary)","Status":"Verified","Notes":"Controlled by Frontier"},{"Scheme":"LENs","Company Type":"Standard","Requirement":"Annual half-day MRV surveyor visit to each farm","Broad Theme":"Measurement & verification","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"LENs MRV Protocol, Oct 2025","Status":"Verified","Notes":null},{"Scheme":"LENs","Company Type":"Standard","Requirement":"Whole-farm, per-crop data collection across the rotation","Broad Theme":"Measurement & verification","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"LENs MRV Protocol p.3","Status":"Verified","Notes":null},{"Scheme":"LENs","Company Type":"Standard","Requirement":"Soil organic carbon sampling (statistically significant methods)","Broad Theme":"Carbon / GHG","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"LENs MRV Protocol p.3","Status":"Verified","Notes":null},{"Scheme":"LENs","Company Type":"Standard","Requirement":"Report soil health, water, biodiversity, climate mitigation and economic resilience","Broad Theme":"Measurement & verification","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"LENs MRV Protocol p.2","Status":"Verified","Notes":null},{"Scheme":"LENs","Company Type":"Standard","Requirement":"Year-on-year change measured (ex-post, measured not projected)","Broad Theme":"Continuous improvement & farm plans","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"LENs MRV Protocol p.3","Status":"Verified","Notes":null},{"Scheme":"LENs","Company Type":"Standard","Requirement":"Resilience Pathway: gradual adoption and maintenance of combined practices","Broad Theme":"Continuous improvement & farm plans","Regen Principle":"Context","Mandatory / Optional / Tiered":"Tiered","Practice / Outcome / Evidence":"Practice-based","Source Citation":"LENs MRV Protocol p.2","Status":"Verified","Notes":"Rewards transition + maintenance"},{"Scheme":"LENs","Company Type":"Standard","Requirement":"Two funding tracks: Transition funding (per practice) / Regen Pathway Premium (tiered thresholds)","Broad Theme":"Continuous improvement & farm plans","Regen Principle":"Context","Mandatory / Optional / Tiered":"Tiered","Practice / Outcome / Evidence":"Practice-based","Source Citation":"LENs MRV + workbook","Status":"Partially verified","Notes":"Threshold detail not in MRV summary"},{"Scheme":"LENs","Company Type":"Standard","Requirement":"Third-party limited GHG verification (ISO 14064-3) from 2025; external data assurance","Broad Theme":"Measurement & verification","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"LENs MRV Protocol p.2-4","Status":"Verified","Notes":null},{"Scheme":"LENs","Company Type":"Standard","Requirement":"Farm Data Principles certification (opt-in data governance)","Broad Theme":"Measurement & verification","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"LENs MRV Protocol p.1","Status":"Verified","Notes":null},{"Scheme":"LENs","Company Type":"Standard","Requirement":"Cannot stack with private schemes on productive land (public schemes permitted)","Broad Theme":"Continuous improvement & farm plans","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory (rule)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"LENs MRV Protocol p.4","Status":"Verified","Notes":null},{"Scheme":"LENs","Company Type":"Standard","Requirement":"Specific practice rules (e.g. pesticide/herbicide prohibition; non-chemical weed control)","Broad Theme":"Pesticide & IPM","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"-","Practice / Outcome / Evidence":"Practice-based","Source Citation":"NOT in supplied source","Status":"Unverified","Notes":"Workbook text is a copy of the Soil Association entry; supplied LENs doc is MRV-only"},{"Scheme":"ADM (Re:generations)","Company Type":"Value chain / corporate","Requirement":"Menu of 7 qualifying practices; no single practice mandatory (choose practices or outcomes)","Broad Theme":"Continuous improvement & farm plans","Regen Principle":"Context","Mandatory / Optional / Tiered":"Optional (menu)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"ADM Regen Ag Report 2025 p.20","Status":"Verified","Notes":null},{"Scheme":"ADM (Re:generations)","Company Type":"Value chain / corporate","Requirement":"Cover crop","Broad Theme":"Cover crops & ground cover","Regen Principle":"Soil Cover","Mandatory / Optional / Tiered":"Optional (menu)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"ADM report p.20","Status":"Verified","Notes":null},{"Scheme":"ADM (Re:generations)","Company Type":"Value chain / corporate","Requirement":"4R nutrient management","Broad Theme":"Nutrient management","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Optional (menu)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"ADM report p.20","Status":"Verified","Notes":null},{"Scheme":"ADM (Re:generations)","Company Type":"Value chain / corporate","Requirement":"Conservation tillage and no tillage","Broad Theme":"Tillage & soil disturbance","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Optional (menu)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"ADM report p.20","Status":"Verified","Notes":null},{"Scheme":"ADM (Re:generations)","Company Type":"Value chain / corporate","Requirement":"Companion cropping","Broad Theme":"Crop rotation & diversity","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Optional (menu)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"ADM report p.20","Status":"Verified","Notes":null},{"Scheme":"ADM (Re:generations)","Company Type":"Value chain / corporate","Requirement":"Crop rotation","Broad Theme":"Crop rotation & diversity","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Optional (menu)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"ADM report p.20","Status":"Verified","Notes":null},{"Scheme":"ADM (Re:generations)","Company Type":"Value chain / corporate","Requirement":"Biodiversity improvements","Broad Theme":"Biodiversity & habitat","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Optional (menu)","Practice / Outcome / Evidence":"Outcome-based","Source Citation":"ADM report p.20","Status":"Verified","Notes":null},{"Scheme":"ADM (Re:generations)","Company Type":"Value chain / corporate","Requirement":"Organic manure use","Broad Theme":"Nutrient management","Regen Principle":"Livestock Integration","Mandatory / Optional / Tiered":"Optional (menu)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"ADM report p.20","Status":"Verified","Notes":null},{"Scheme":"ADM (Re:generations)","Company Type":"Value chain / corporate","Requirement":"Practices verified by satellite remote-sensing","Broad Theme":"Measurement & verification","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory (mechanism)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"ADM report p.21","Status":"Verified","Notes":null},{"Scheme":"ADM (Re:generations)","Company Type":"Value chain / corporate","Requirement":"Data collected/validated via Map of Agriculture platform","Broad Theme":"Measurement & verification","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory (mechanism)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"ADM report p.21","Status":"Verified","Notes":null},{"Scheme":"ADM (Re:generations)","Company Type":"Value chain / corporate","Requirement":"Enrolment and data collection/sharing to participate","Broad Theme":"Measurement & verification","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"ADM report p.7, 21","Status":"Partially verified","Notes":"Marketing-level detail only"},{"Scheme":"ADM (Re:generations)","Company Type":"Value chain / corporate","Requirement":"Per-practice GBP/ha payment rates","Broad Theme":"Nutrient management","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"-","Practice / Outcome / Evidence":"Practice-based","Source Citation":"NOT stated in source","Status":"Unverified","Notes":"Report references payments but gives no rates; workbook's GBP8/ha figures unverified"},{"Scheme":"Nestle Agriculture Framework","Company Type":"Value chain / corporate","Requirement":"Participate in crop-specific Farm Assessment Tool (baseline + repeat)","Broad Theme":"Measurement & verification","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory (mechanism)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"Nestle Framework sec 4c","Status":"Verified","Notes":"'Playbook, not a rulebook'"},{"Scheme":"Nestle Agriculture Framework","Company Type":"Value chain / corporate","Requirement":"Three-level grading progression (Engaged / Advanced / Leading)","Broad Theme":"Continuous improvement & farm plans","Regen Principle":"Context","Mandatory / Optional / Tiered":"Tiered (framework)","Practice / Outcome / Evidence":"Outcome-based","Source Citation":"Nestle Framework sec 4c","Status":"Partially verified","Notes":"Thresholds deferred to internal annex"},{"Scheme":"Nestle Agriculture Framework","Company Type":"Value chain / corporate","Requirement":"Soil cover (months/yr) assessed","Broad Theme":"Cover crops & ground cover","Regen Principle":"Soil Cover","Mandatory / Optional / Tiered":"Optional (assessed)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"Annex 2 Q1.01-1.04","Status":"Verified","Notes":null},{"Scheme":"Nestle Agriculture Framework","Company Type":"Value chain / corporate","Requirement":"Cover crops (% land) assessed","Broad Theme":"Cover crops & ground cover","Regen Principle":"Soil Cover","Mandatory / Optional / Tiered":"Optional (recommended)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"sec 3 #1","Status":"Verified","Notes":null},{"Scheme":"Nestle Agriculture Framework","Company Type":"Value chain / corporate","Requirement":"Crop rotation (count over 3 yrs) assessed","Broad Theme":"Crop rotation & diversity","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Optional (recommended)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"sec 3 #2","Status":"Verified","Notes":null},{"Scheme":"Nestle Agriculture Framework","Company Type":"Value chain / corporate","Requirement":"Minimum/conservation tillage (% land) assessed","Broad Theme":"Tillage & soil disturbance","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Optional (recommended)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"sec 3 #4","Status":"Verified","Notes":null},{"Scheme":"Nestle Agriculture Framework","Company Type":"Value chain / corporate","Requirement":"Mulch / crop-residue cover assessed","Broad Theme":"Cover crops & ground cover","Regen Principle":"Soil Cover","Mandatory / Optional / Tiered":"Optional (recommended)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"sec 3 #3","Status":"Verified","Notes":null},{"Scheme":"Nestle Agriculture Framework","Company Type":"Value chain / corporate","Requirement":"Erosion control implemented (assessed)","Broad Theme":"Soil health & testing","Regen Principle":"Context","Mandatory / Optional / Tiered":"Optional (assessed)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"Annex 2 Q1.05-1.06","Status":"Verified","Notes":null},{"Scheme":"Nestle Agriculture Framework","Company Type":"Value chain / corporate","Requirement":"Soil analysis at least every 3 years (assessed)","Broad Theme":"Soil health & testing","Regen Principle":"Context","Mandatory / Optional / Tiered":"Optional (assessed)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"Annex 2 Q1.07","Status":"Verified","Notes":null},{"Scheme":"Nestle Agriculture Framework","Company Type":"Value chain / corporate","Requirement":"Soil organic matter tracked (aim: increase yearly)","Broad Theme":"Carbon / GHG","Regen Principle":"Context","Mandatory / Optional / Tiered":"Aspirational","Practice / Outcome / Evidence":"Outcome-based","Source Citation":"sec 4c / sec 5","Status":"Partially verified","Notes":"Aspiration, not pass mark"},{"Scheme":"Nestle Agriculture Framework","Company Type":"Value chain / corporate","Requirement":"Integrated nutrient management plan based on crop needs/soil analysis","Broad Theme":"Nutrient management","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Optional (recommended)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"sec 3 #8","Status":"Verified","Notes":null},{"Scheme":"Nestle Agriculture Framework","Company Type":"Value chain / corporate","Requirement":"4R nutrient principles (assessed)","Broad Theme":"Nutrient management","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Optional (assessed)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"Annex 2 Q1.13","Status":"Verified","Notes":null},{"Scheme":"Nestle Agriculture Framework","Company Type":"Value chain / corporate","Requirement":"Organic fertiliser share (assessed)","Broad Theme":"Nutrient management","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Optional (recommended)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"sec 3 #5","Status":"Verified","Notes":null},{"Scheme":"Nestle Agriculture Framework","Company Type":"Value chain / corporate","Requirement":"Fertilizer productivity (yield per kg N) measured","Broad Theme":"Nutrient management","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Result KPI","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"sec 4c","Status":"Verified","Notes":null},{"Scheme":"Nestle Agriculture Framework","Company Type":"Value chain / corporate","Requirement":"IPM principles followed (assessed)","Broad Theme":"Pesticide & IPM","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Optional (recommended)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"sec 3 #12","Status":"Verified","Notes":null},{"Scheme":"Nestle Agriculture Framework","Company Type":"Value chain / corporate","Requirement":"Pesticide applications counted (aim: reduce yearly)","Broad Theme":"Pesticide & IPM","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Aspirational / result KPI","Practice / Outcome / Evidence":"Outcome-based","Source Citation":"sec 4c / sec 5","Status":"Verified","Notes":null},{"Scheme":"Nestle Agriculture Framework","Company Type":"Value chain / corporate","Requirement":"Habitat areas (% land with biodiversity infrastructure)","Broad Theme":"Biodiversity & habitat","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Result KPI","Practice / Outcome / Evidence":"Outcome-based","Source Citation":"sec 4c","Status":"Verified","Notes":null},{"Scheme":"Nestle Agriculture Framework","Company Type":"Value chain / corporate","Requirement":"Riparian buffers (% watercourses, 5-20m width)","Broad Theme":"Water management","Regen Principle":"Context","Mandatory / Optional / Tiered":"Result KPI","Practice / Outcome / Evidence":"Practice-based","Source Citation":"sec 3 #7","Status":"Verified","Notes":null},{"Scheme":"Nestle Agriculture Framework","Company Type":"Value chain / corporate","Requirement":"Agroforestry / shade cover assessed","Broad Theme":"Biodiversity & habitat","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Optional (recommended)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"sec 3 #10","Status":"Verified","Notes":"Crop-specific"},{"Scheme":"Nestle Agriculture Framework","Company Type":"Value chain / corporate","Requirement":"Intercropping (% land) assessed","Broad Theme":"Crop rotation & diversity","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Optional (recommended)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"sec 3 #9","Status":"Verified","Notes":null},{"Scheme":"Nestle Agriculture Framework","Company Type":"Value chain / corporate","Requirement":"Efficient irrigation practices (assessed)","Broad Theme":"Water management","Regen Principle":"Context","Mandatory / Optional / Tiered":"Optional (recommended)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"sec 3 #6","Status":"Verified","Notes":null},{"Scheme":"Nestle Agriculture Framework","Company Type":"Value chain / corporate","Requirement":"Water productivity / footprint ('going beyond')","Broad Theme":"Water management","Regen Principle":"Context","Mandatory / Optional / Tiered":"Optional","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"sec 4c","Status":"Partially verified","Notes":"Explicitly optional"},{"Scheme":"Nestle Agriculture Framework","Company Type":"Value chain / corporate","Requirement":"Farm carbon footprint estimated (e.g. Cool Farm Tool)","Broad Theme":"Carbon / GHG","Regen Principle":"Context","Mandatory / Optional / Tiered":"Assessed","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"sec 4c / Annex 2 Q2.07","Status":"Verified","Notes":null},{"Scheme":"Nestle Agriculture Framework","Company Type":"Value chain / corporate","Requirement":"Manure storage adequate (dairy best practice)","Broad Theme":"Livestock integration","Regen Principle":"Livestock Integration","Mandatory / Optional / Tiered":"Optional (recommended)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"sec 3 #14","Status":"Partially verified","Notes":"Dairy-specific guidance"},{"Scheme":"Nestle Agriculture Framework","Company Type":"Value chain / corporate","Requirement":"Rotational grazing / multispecies pasture (recommended)","Broad Theme":"Livestock integration","Regen Principle":"Livestock Integration","Mandatory / Optional / Tiered":"Optional (recommended)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"sec 3 #15-16","Status":"Partially verified","Notes":"Dairy-specific"},{"Scheme":"Nestle Agriculture Framework","Company Type":"Value chain / corporate","Requirement":"Farm records kept; P&L calculated (assessed)","Broad Theme":"Measurement & verification","Regen Principle":"Context","Mandatory / Optional / Tiered":"Optional (assessed)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"Annex 2 Q4.01-4.02","Status":"Verified","Notes":null},{"Scheme":"Nestle Agriculture Framework","Company Type":"Value chain / corporate","Requirement":"Training received in regen ag / farm economics (assessed)","Broad Theme":"Continuous improvement & farm plans","Regen Principle":"Context","Mandatory / Optional / Tiered":"Optional (assessed)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"Annex 2 Q4.05-4.06","Status":"Verified","Notes":null},{"Scheme":"FSA (SAI Platform)","Company Type":"Standard","Requirement":"Complete the self-assessment questionnaire (YES/NO); no specific practice mandated or prohibited","Broad Theme":"Continuous improvement & farm plans","Regen Principle":"Context","Mandatory / Optional / Tiered":"Tiered (self-declared)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"FSA Framework v3.0 sec 3.4","Status":"Verified","Notes":"Tier set by proportion of YES answers"},{"Scheme":"FSA (SAI Platform)","Company Type":"Standard","Requirement":"Questions classified Essential / Intermediate / Advanced","Broad Theme":"Continuous improvement & farm plans","Regen Principle":"Context","Mandatory / Optional / Tiered":"Tiered (structure)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"FSA sec 3.4","Status":"Verified","Notes":null},{"Scheme":"FSA (SAI Platform)","Company Type":"Standard","Requirement":"Bronze = 100% Essential; Silver = +>=75% Intermediate; Gold = +>=75% Advanced","Broad Theme":"Continuous improvement & farm plans","Regen Principle":"Context","Mandatory / Optional / Tiered":"Tiered","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"FSA sec 3.4 Fig.7 / 4.3","Status":"Partially verified","Notes":"Full matrix is an image; Silver 75% confirmed in text"},{"Scheme":"FSA (SAI Platform)","Company Type":"Standard","Requirement":"'Not Applicable' answers count towards the score as YES","Broad Theme":"Continuous improvement & farm plans","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory (rule)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"FSA sec 3.4","Status":"Verified","Notes":null},{"Scheme":"FSA (SAI Platform)","Company Type":"Standard","Requirement":"FSA Management System (farm list, SAQs, audit reports, VAS, CIP) for Farm Management Groups","Broad Theme":"Measurement & verification","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory (for FMGs)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"FSA sec 3.2","Status":"Verified","Notes":null},{"Scheme":"FSA (SAI Platform)","Company Type":"Standard","Requirement":"FMG composition change capped at 10% per year","Broad Theme":"Measurement & verification","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory (for FMGs)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"FSA sec 4.6","Status":"Verified","Notes":null},{"Scheme":"FSA (SAI Platform)","Company Type":"Standard","Requirement":"Volume Accounting System (mass balance, per crop per level)","Broad Theme":"Measurement & verification","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory (for FMGs)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"FSA sec 3.2.3","Status":"Verified","Notes":null},{"Scheme":"FSA (SAI Platform)","Company Type":"Standard","Requirement":"Continuous Improvement Plan (priority area + time-bound target + annual review)","Broad Theme":"Continuous improvement & farm plans","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory (verified FMGs); voluntary (stand-alone)","Practice / Outcome / Evidence":"Outcome-based","Source Citation":"FSA sec 3.5","Status":"Verified","Notes":null},{"Scheme":"FSA (SAI Platform)","Company Type":"Standard","Requirement":"Third-party verification (optional) yields Bronze/Silver/Gold claim","Broad Theme":"Measurement & verification","Regen Principle":"Context","Mandatory / Optional / Tiered":"Optional","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"FSA sec 4.1","Status":"Verified","Notes":null},{"Scheme":"FSA (SAI Platform)","Company Type":"Standard","Requirement":"Management System audited every three years","Broad Theme":"Measurement & verification","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory (when verified)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"FSA sec 4.4.2","Status":"Verified","Notes":null},{"Scheme":"FSA (SAI Platform)","Company Type":"Standard","Requirement":"On-farm audit sampling scaled to group size","Broad Theme":"Measurement & verification","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory (when verified)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"FSA sec 4.4.3","Status":"Verified","Notes":null},{"Scheme":"Frontier (programmes)","Company Type":"Value chain / corporate","Requirement":"Two programme types: data-collection contracts (premium for data) and supply-chain practice payments (GBP/ha)","Broad Theme":"Continuous improvement & farm plans","Regen Principle":"Context","Mandatory / Optional / Tiered":"Tiered / menu","Practice / Outcome / Evidence":"Practice-based","Source Citation":"Farmers Weekly, Impey, 23 Apr 2025 (secondary)","Status":"Verified","Notes":"Frontier largely delivers others' programmes"},{"Scheme":"Frontier (programmes)","Company Type":"Value chain / corporate","Requirement":"Practices linked to reducing emissions, improving soil health and supporting biodiversity","Broad Theme":"Continuous improvement & farm plans","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Optional (menu)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"FW article (secondary)","Status":"Verified","Notes":"General; no specific thresholds in article"},{"Scheme":"Frontier (programmes)","Company Type":"Value chain / corporate","Requirement":"Data sharing required","Broad Theme":"Measurement & verification","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"FW article (secondary)","Status":"Verified","Notes":null},{"Scheme":"Frontier (programmes)","Company Type":"Value chain / corporate","Requirement":"Audit readiness required","Broad Theme":"Measurement & verification","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"FW article (secondary)","Status":"Verified","Notes":null},{"Scheme":"Frontier (programmes)","Company Type":"Value chain / corporate","Requirement":"Specific practice thresholds (reduced till; ~10-15% N reduction; 5% habitat; hedgerow mgmt; GBP10/t)","Broad Theme":"Continuous improvement & farm plans","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"-","Practice / Outcome / Evidence":"Practice-based","Source Citation":"NOT in supplied article","Status":"Unverified","Notes":"From a CPM Jul-2024 article not in folder"},{"Scheme":"Matthews Cotswold","Company Type":"Value chain / corporate","Requirement":"In-house regen standard via Cotswold Grain Partnership; scalable premium (5+ yrs and N-efficiency)","Broad Theme":"Continuous improvement & farm plans","Regen Principle":"Context","Mandatory / Optional / Tiered":"Tiered","Practice / Outcome / Evidence":"Outcome-based","Source Citation":"Farmers Weekly, Gillbard, 3 Nov 2024 (secondary)","Status":"Verified","Notes":null},{"Scheme":"Matthews Cotswold","Company Type":"Value chain / corporate","Requirement":"Demonstrate progress on Soil parameter (fertility / organic matter)","Broad Theme":"Soil health & testing","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Outcome-based","Source Citation":"FW article (secondary)","Status":"Verified","Notes":null},{"Scheme":"Matthews Cotswold","Company Type":"Value chain / corporate","Requirement":"Demonstrate progress on Carbon parameter (sequestration)","Broad Theme":"Carbon / GHG","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Outcome-based","Source Citation":"FW article (secondary)","Status":"Verified","Notes":null},{"Scheme":"Matthews Cotswold","Company Type":"Value chain / corporate","Requirement":"Demonstrate progress on Water parameter (infiltration)","Broad Theme":"Water management","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Outcome-based","Source Citation":"FW article (secondary)","Status":"Verified","Notes":"Methodology not publicly specified"},{"Scheme":"Matthews Cotswold","Company Type":"Value chain / corporate","Requirement":"Demonstrate progress on Biodiversity parameter (landscape)","Broad Theme":"Biodiversity & habitat","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Outcome-based","Source Citation":"FW article (secondary)","Status":"Verified","Notes":"Methodology not publicly specified"},{"Scheme":"Matthews Cotswold","Company Type":"Value chain / corporate","Requirement":"Demonstrate progress on Food-security parameter (yield / financial sustainability)","Broad Theme":"Continuous improvement & farm plans","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Outcome-based","Source Citation":"FW article (secondary)","Status":"Verified","Notes":"Workbook omitted this 5th parameter"},{"Scheme":"Matthews Cotswold","Company Type":"Value chain / corporate","Requirement":"Maximum 180 kg N/ha","Broad Theme":"Nutrient management","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory (cap)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"FW article (secondary)","Status":"Verified","Notes":null},{"Scheme":"Matthews Cotswold","Company Type":"Value chain / corporate","Requirement":"No pre-harvest glyphosate","Broad Theme":"Pesticide & IPM","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Practice-based","Source Citation":"FW article (secondary)","Status":"Verified","Notes":null},{"Scheme":"Matthews Cotswold","Company Type":"Value chain / corporate","Requirement":"Independent third-party audit against the parameters","Broad Theme":"Measurement & verification","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"FW article (secondary)","Status":"Verified","Notes":null},{"Scheme":"Green Farm Collective","Company Type":"Value chain / corporate","Requirement":"Must be an approved member of a baseline scheme (e.g. Red Tractor)","Broad Theme":"Continuous improvement & farm plans","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"GFC Scheme Standards (greenfarmcollective.com)","Status":"Verified","Notes":"Layered on a baseline scheme"},{"Scheme":"Green Farm Collective","Company Type":"Value chain / corporate","Requirement":"Written, established and implemented soil management plan","Broad Theme":"Continuous improvement & farm plans","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"GFC Scheme Standards","Status":"Verified","Notes":null},{"Scheme":"Green Farm Collective","Company Type":"Value chain / corporate","Requirement":"Long-term cropping plan","Broad Theme":"Continuous improvement & farm plans","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"GFC Scheme Standards","Status":"Verified","Notes":null},{"Scheme":"Green Farm Collective","Company Type":"Value chain / corporate","Requirement":"Plant health policy","Broad Theme":"Pesticide & IPM","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"GFC Scheme Standards","Status":"Verified","Notes":null},{"Scheme":"Green Farm Collective","Company Type":"Value chain / corporate","Requirement":"Biodiversity policy","Broad Theme":"Biodiversity & habitat","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"GFC Scheme Standards","Status":"Verified","Notes":null},{"Scheme":"Green Farm Collective","Company Type":"Value chain / corporate","Requirement":"Water management policy","Broad Theme":"Water management","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"GFC Scheme Standards","Status":"Verified","Notes":null},{"Scheme":"Green Farm Collective","Company Type":"Value chain / corporate","Requirement":"Nutrient management plan","Broad Theme":"Nutrient management","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"GFC Scheme Standards","Status":"Verified","Notes":null},{"Scheme":"Green Farm Collective","Company Type":"Value chain / corporate","Requirement":"No more than 180 kg/ha total nitrogen","Broad Theme":"Nutrient management","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory (cap)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"GFC Scheme Standards","Status":"Verified","Notes":null},{"Scheme":"Green Farm Collective","Company Type":"Value chain / corporate","Requirement":"Maximum single dose of 45 kg/ha nitrogen","Broad Theme":"Nutrient management","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory (cap)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"GFC Scheme Standards","Status":"Verified","Notes":null},{"Scheme":"Green Farm Collective","Company Type":"Value chain / corporate","Requirement":"No untreated sewage sludge; treated biosolids per Safe Sludge Matrix and not more than once in 5 years","Broad Theme":"Nutrient management","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Practice-based","Source Citation":"GFC Scheme Standards","Status":"Verified","Notes":null},{"Scheme":"Green Farm Collective","Company Type":"Value chain / corporate","Requirement":"Composts PAS 100 / digestate PAS 110 certified","Broad Theme":"Nutrient management","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Practice-based","Source Citation":"GFC Scheme Standards","Status":"Verified","Notes":null},{"Scheme":"Green Farm Collective","Company Type":"Value chain / corporate","Requirement":"Farmyard manure minimum 4 months matured unless mechanically composted","Broad Theme":"Nutrient management","Regen Principle":"Livestock Integration","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Practice-based","Source Citation":"GFC Scheme Standards","Status":"Verified","Notes":null},{"Scheme":"Green Farm Collective","Company Type":"Value chain / corporate","Requirement":"Diverse crop rotation","Broad Theme":"Crop rotation & diversity","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Practice-based","Source Citation":"GFC Scheme Standards","Status":"Verified","Notes":"Official page says 'diverse'; workbook's 'minimum six-crop' not stated - see Gap Register"},{"Scheme":"Green Farm Collective","Company Type":"Value chain / corporate","Requirement":"Minimal soil disturbance; root/vegetable crops not grown more than 1 year in 7","Broad Theme":"Tillage & soil disturbance","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Practice-based","Source Citation":"GFC Scheme Standards","Status":"Verified","Notes":null},{"Scheme":"Green Farm Collective","Company Type":"Value chain / corporate","Requirement":"Justified synthetic input usage with records maintained","Broad Theme":"Nutrient management","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"GFC Scheme Standards","Status":"Verified","Notes":null},{"Scheme":"Green Farm Collective","Company Type":"Value chain / corporate","Requirement":"No pre-harvest glyphosate","Broad Theme":"Pesticide & IPM","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory (prohibition)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"GFC Scheme Standards","Status":"Verified","Notes":null},{"Scheme":"Green Farm Collective","Company Type":"Value chain / corporate","Requirement":"Amino acid applied with or within 7 days of spring sulfonylurea herbicide applications","Broad Theme":"Pesticide & IPM","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Practice-based","Source Citation":"GFC Scheme Standards","Status":"Verified","Notes":null},{"Scheme":"Green Farm Collective","Company Type":"Value chain / corporate","Requirement":"No herbicides after GS39 (full flag leaf emergence)","Broad Theme":"Pesticide & IPM","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory (prohibition)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"GFC Scheme Standards","Status":"Verified","Notes":null},{"Scheme":"Green Farm Collective","Company Type":"Value chain / corporate","Requirement":"Compliance via self-assessment, reviews and independent spot-checks (Food Integrity Assurance)","Broad Theme":"Measurement & verification","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"GFC Scheme Standards","Status":"Verified","Notes":null},{"Scheme":"LEAF Marque","Company Type":"Regen certification","Requirement":"Soil assessment (map soil types and degradation risks), reviewed annually","Broad Theme":"Soil health & testing","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory (Core)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"LEAF Marque v17.0 CP 2.1.1","Status":"Verified","Notes":null},{"Scheme":"LEAF Marque","Company Type":"Regen certification","Requirement":"Soil management plan with targets to improve soil health; integrate regenerative practices where appropriate","Broad Theme":"Continuous improvement & farm plans","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory (Core)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"CP 2.1.2","Status":"Verified","Notes":null},{"Scheme":"LEAF Marque","Company Type":"Regen certification","Requirement":"Nutrient assessment based on regular soil testing (min. pH)","Broad Theme":"Nutrient management","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory (Core)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"CP 2.1.5","Status":"Verified","Notes":null},{"Scheme":"LEAF Marque","Company Type":"Regen certification","Requirement":"Integrated nutrient management plan (avoid excess, use efficiently)","Broad Theme":"Nutrient management","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory (Core)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"CP 2.1.6","Status":"Verified","Notes":"No numeric N cap"},{"Scheme":"LEAF Marque","Company Type":"Regen certification","Requirement":"Nitrogen Use Efficiency calculated annually","Broad Theme":"Nutrient management","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Tiered (Advanced)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"CP 2.1.7","Status":"Verified","Notes":null},{"Scheme":"LEAF Marque","Company Type":"Regen certification","Requirement":"Strategies to prevent soil degradation; no significant visual degradation","Broad Theme":"Soil health & testing","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory (Core)","Practice / Outcome / Evidence":"Outcome-based","Source Citation":"CP 2.2.1","Status":"Verified","Notes":null},{"Scheme":"LEAF Marque","Company Type":"Regen certification","Requirement":"Strategies to increase/maintain soil organic matter","Broad Theme":"Soil health & testing","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory (Core)","Practice / Outcome / Evidence":"Outcome-based","Source Citation":"CP 2.2.2","Status":"Verified","Notes":"No SOM target value"},{"Scheme":"LEAF Marque","Company Type":"Regen certification","Requirement":"Strategies to minimise soil disturbance","Broad Theme":"Tillage & soil disturbance","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory (Core)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"CP 2.2.3","Status":"Verified","Notes":"No quantified tillage limit / no-till mandate"},{"Scheme":"LEAF Marque","Company Type":"Regen certification","Requirement":"Strategies to minimise bare ground","Broad Theme":"Cover crops & ground cover","Regen Principle":"Soil Cover","Mandatory / Optional / Tiered":"Mandatory (Core)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"CP 2.2.4","Status":"Verified","Notes":null},{"Scheme":"LEAF Marque","Company Type":"Regen certification","Requirement":"Strategies to maintain living roots (e.g. cover crops)","Broad Theme":"Cover crops & ground cover","Regen Principle":"Living Roots","Mandatory / Optional / Tiered":"Tiered (Advanced)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"CP 2.2.5","Status":"Verified","Notes":"Living roots/cover crops aspirational"},{"Scheme":"LEAF Marque","Company Type":"Regen certification","Requirement":"Soil health monitored annually (physical, biological OR chemical)","Broad Theme":"Soil health & testing","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory (Core)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"CP 2.3.1","Status":"Verified","Notes":"Only one property type required"},{"Scheme":"LEAF Marque","Company Type":"Regen certification","Requirement":"Soil organic matter measured every 3-5 years","Broad Theme":"Soil health & testing","Regen Principle":"Context","Mandatory / Optional / Tiered":"Tiered (Advanced)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"CP 2.3.2","Status":"Verified","Notes":null},{"Scheme":"LEAF Marque","Company Type":"Regen certification","Requirement":"Soil organic carbon measured every 3-5 years","Broad Theme":"Carbon / GHG","Regen Principle":"Context","Mandatory / Optional / Tiered":"Tiered (Advanced)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"CP 2.3.3","Status":"Verified","Notes":null},{"Scheme":"LEAF Marque","Company Type":"Regen certification","Requirement":"No fertiliser applied to buffer zones, protected areas or habitat areas","Broad Theme":"Nutrient management","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory (Core)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"CP 2.5.1","Status":"Verified","Notes":null},{"Scheme":"LEAF Marque","Company Type":"Regen certification","Requirement":"Fertiliser equipment maintained and calibrated; applications recorded","Broad Theme":"Nutrient management","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory (Core)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"CP 2.5.3 / 2.5.5","Status":"Verified","Notes":null},{"Scheme":"LEAF Marque","Company Type":"Regen certification","Requirement":"Short-term crop/rotation plan over 3 years","Broad Theme":"Crop rotation & diversity","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Mandatory (Core)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"CP 3.1.1","Status":"Verified","Notes":null},{"Scheme":"LEAF Marque","Company Type":"Regen certification","Requirement":"Long-term (>3 year) rotation planning","Broad Theme":"Crop rotation & diversity","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Tiered (Advanced)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"CP 3.1.2","Status":"Verified","Notes":null},{"Scheme":"LEAF Marque","Company Type":"Regen certification","Requirement":"Increase/optimise diversity of crops and cover crops in rotation","Broad Theme":"Crop rotation & diversity","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Tiered (Advanced)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"CP 3.1.3","Status":"Verified","Notes":null},{"Scheme":"LEAF Marque","Company Type":"Regen certification","Requirement":"Crop health & IPM plan; decisions prioritised per the IPM pyramid hierarchy","Broad Theme":"Pesticide & IPM","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory (Core)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"CP 3.1.5","Status":"Verified","Notes":null},{"Scheme":"LEAF Marque","Company Type":"Regen certification","Requirement":"Monitor pests/weeds/diseases and beneficial organisms; use thresholds","Broad Theme":"Pesticide & IPM","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory (Core)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"CP 3.2.1","Status":"Verified","Notes":null},{"Scheme":"LEAF Marque","Company Type":"Regen certification","Requirement":"Minimise impacts to beneficial and non-target species incl. pollinators","Broad Theme":"Biodiversity & habitat","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Mandatory (Core)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"CP 3.3.2","Status":"Verified","Notes":null},{"Scheme":"LEAF Marque","Company Type":"Regen certification","Requirement":"Resistance management strategy for each plant-protection product","Broad Theme":"Pesticide & IPM","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory (Core)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"CP 3.3.3","Status":"Verified","Notes":null},{"Scheme":"LEAF Marque","Company Type":"Regen certification","Requirement":"Only approved plant-protection products used and stored","Broad Theme":"Pesticide & IPM","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory (Core)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"CP 3.3.5","Status":"Verified","Notes":null},{"Scheme":"LEAF Marque","Company Type":"Regen certification","Requirement":"PPP equipment calibrated; operators competent/qualified","Broad Theme":"Pesticide & IPM","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Mandatory (Core)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"CP 3.3.7 / 3.3.8","Status":"Verified","Notes":null},{"Scheme":"LEAF Marque","Company Type":"Regen certification","Requirement":"No PPPs applied to buffer zones, protected areas or habitat; buffer strips used","Broad Theme":"Pesticide & IPM","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Mandatory (Core)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"CP 3.3.13","Status":"Verified","Notes":null},{"Scheme":"LEAF Marque","Company Type":"Regen certification","Requirement":"Energy assessment; measured energy use at least annually","Broad Theme":"Carbon / GHG","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory (Core)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"CP 5.1.1","Status":"Verified","Notes":null},{"Scheme":"LEAF Marque","Company Type":"Regen certification","Requirement":"On-farm GHG emissions from energy use recorded annually","Broad Theme":"Carbon / GHG","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory (Core)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"CP 5.1.2","Status":"Verified","Notes":null},{"Scheme":"LEAF Marque","Company Type":"Regen certification","Requirement":"Energy management plan to reduce consumption and non-renewable dependency","Broad Theme":"Carbon / GHG","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory (Core)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"CP 5.1.3","Status":"Verified","Notes":null},{"Scheme":"LEAF Marque","Company Type":"Regen certification","Requirement":"Carbon footprint calculated annually with year-on-year comparison","Broad Theme":"Carbon / GHG","Regen Principle":"Context","Mandatory / Optional / Tiered":"Tiered (Advanced)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"CP 5.1.4","Status":"Verified","Notes":null},{"Scheme":"LEAF Marque","Company Type":"Regen certification","Requirement":"Fixed fuel tanks >200 L bunded; >10 m from drains; underground tanks pressure-tested every 5 years","Broad Theme":"Water management","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory (Core)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"CP 5.2.1","Status":"Verified","Notes":null},{"Scheme":"LEAF Marque","Company Type":"Regen certification","Requirement":"Strategies to mitigate GHG emissions from energy use and nutrient applications","Broad Theme":"Carbon / GHG","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory (Core)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"CP 5.3.2 / 5.3.3","Status":"Verified","Notes":null},{"Scheme":"LEAF Marque","Company Type":"Regen certification","Requirement":"Strategies to capture and retain GHGs on-farm (soils, agroforestry, wetlands)","Broad Theme":"Carbon / GHG","Regen Principle":"Context","Mandatory / Optional / Tiered":"Tiered (Advanced)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"CP 5.4.1","Status":"Verified","Notes":"Sequestration aspirational"},{"Scheme":"LEAF Marque","Company Type":"Regen certification","Requirement":"Water assessment; water use measured at least annually; site map","Broad Theme":"Water management","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory (Core)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"CP 6.1.1","Status":"Verified","Notes":null},{"Scheme":"LEAF Marque","Company Type":"Regen certification","Requirement":"Water management plan (efficiency, reduce abstracted/mains water)","Broad Theme":"Water management","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory (Core)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"CP 6.1.3","Status":"Verified","Notes":null},{"Scheme":"LEAF Marque","Company Type":"Regen certification","Requirement":"Groundwater abstraction/surface water use legal; valid licence held and adhered to","Broad Theme":"Water management","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory (Core)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"CP 6.2.6","Status":"Verified","Notes":null},{"Scheme":"LEAF Marque","Company Type":"Regen certification","Requirement":"2-metre buffer zone around waterbodies","Broad Theme":"Water management","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory (Core)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"CP 6.3.1","Status":"Verified","Notes":null},{"Scheme":"LEAF Marque","Company Type":"Regen certification","Requirement":"10-metre buffer zone around waterbodies (reducible to 6 m with precision techniques)","Broad Theme":"Water management","Regen Principle":"Context","Mandatory / Optional / Tiered":"Tiered (Advanced)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"CP 6.3.2","Status":"Verified","Notes":null},{"Scheme":"LEAF Marque","Company Type":"Regen certification","Requirement":"Strategies to prevent soil/silt runoff into waterbodies","Broad Theme":"Water management","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory (Core)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"CP 6.3.3","Status":"Verified","Notes":null},{"Scheme":"LEAF Marque","Company Type":"Regen certification","Requirement":"Landscape & biodiversity assessment; map habitats; identify 4 key species (one a pollinator)","Broad Theme":"Biodiversity & habitat","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Mandatory (Core)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"CP 7.1.1","Status":"Verified","Notes":null},{"Scheme":"LEAF Marque","Company Type":"Regen certification","Requirement":"Landscape & biodiversity plan; create additional habitat over time; support key species","Broad Theme":"Biodiversity & habitat","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Mandatory (Core)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"CP 7.1.2","Status":"Verified","Notes":null},{"Scheme":"LEAF Marque","Company Type":"Regen certification","Requirement":"At least 5% of farm managed as habitat","Broad Theme":"Biodiversity & habitat","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Mandatory (Core)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"CP 7.3.x (per workbook)","Status":"Partially verified","Notes":"Section 7.3 beyond fetched text (truncated at p.70/99); confirm against full standard"},{"Scheme":"LEAF Marque","Company Type":"Regen certification","Requirement":"IFM Policy with continuous-improvement commitment, reviewed annually","Broad Theme":"Continuous improvement & farm plans","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory (Core)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"CP 1.5.1","Status":"Verified","Notes":null},{"Scheme":"LEAF Marque","Company Type":"Regen certification","Requirement":"Annual third-party on-farm audit (accredited CB); full conformance with all Core control points","Broad Theme":"Measurement & verification","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory (Core)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"Scope / Key pp.5,9","Status":"Verified","Notes":"Advanced points preferable, not required"},{"Scheme":"Agreena","Company Type":"Standard","Requirement":"Adopt at least one of four regenerative practices; flexible contract, any number of fields (no single practice mandatory)","Broad Theme":"Continuous improvement & farm plans","Regen Principle":"Context","Mandatory / Optional / Tiered":"Optional (menu)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"Agreena / AgreenaCarbon (agreena.com)","Status":"Verified","Notes":"Soil carbon credit programme"},{"Scheme":"Agreena","Company Type":"Standard","Requirement":"Till your soil less (reduced/no tillage)","Broad Theme":"Tillage & soil disturbance","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Optional (menu)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"Agreena site","Status":"Verified","Notes":null},{"Scheme":"Agreena","Company Type":"Standard","Requirement":"Manage crop residues sustainably (mulch and leave in place)","Broad Theme":"Cover crops & ground cover","Regen Principle":"Soil Cover","Mandatory / Optional / Tiered":"Optional (menu)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"Agreena site","Status":"Verified","Notes":null},{"Scheme":"Agreena","Company Type":"Standard","Requirement":"Use cover crops after harvest","Broad Theme":"Cover crops & ground cover","Regen Principle":"Soil Cover","Mandatory / Optional / Tiered":"Optional (menu)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"Agreena site","Status":"Verified","Notes":null},{"Scheme":"Agreena","Company Type":"Standard","Requirement":"Use organic fertilisers (or an organic/synthetic mix)","Broad Theme":"Nutrient management","Regen Principle":"Minimised Disturbance","Mandatory / Optional / Tiered":"Optional (menu)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"Agreena site","Status":"Verified","Notes":null},{"Scheme":"Agreena","Company Type":"Standard","Requirement":"Report field location and size, plus 5-year practice history, at enrolment","Broad Theme":"Measurement & verification","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"Agreena site (3 steps)","Status":"Verified","Notes":null},{"Scheme":"Agreena","Company Type":"Standard","Requirement":"Report field actuals (practices used) after harvest","Broad Theme":"Measurement & verification","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"Agreena site (3 steps)","Status":"Verified","Notes":null},{"Scheme":"Agreena","Company Type":"Standard","Requirement":"Satellite and AI MRV technology measures practices and verifies soil carbon","Broad Theme":"Measurement & verification","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory (mechanism)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"Agreena site","Status":"Verified","Notes":null},{"Scheme":"Agreena","Company Type":"Standard","Requirement":"Third-party validation under Verra Verified Carbon Standard","Broad Theme":"Measurement & verification","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"Agreena site","Status":"Verified","Notes":null},{"Scheme":"Agreena","Company Type":"Standard","Requirement":"More hectares enrolled and more practices adopted earn more credits","Broad Theme":"Continuous improvement & farm plans","Regen Principle":"Context","Mandatory / Optional / Tiered":"Optional (incentivised)","Practice / Outcome / Evidence":"Outcome-based","Source Citation":"Agreena site","Status":"Verified","Notes":null},{"Scheme":"Regenerating Together (SAI)","Company Type":"Standard","Requirement":"Four-step process: context analysis, outcome selection, practice adoption, monitor & assess","Broad Theme":"Continuous improvement & farm plans","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory (process)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"RTF Narrative v1.1 Oct 2024 p.6","Status":"Verified","Notes":"Designed for food-company implementation groups"},{"Scheme":"Regenerating Together (SAI)","Company Type":"Standard","Requirement":"Context analysis: 12 material criteria across 4 impact areas, scored 1-3","Broad Theme":"Measurement & verification","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"RTF p.8","Status":"Verified","Notes":null},{"Scheme":"Regenerating Together (SAI)","Company Type":"Standard","Requirement":"Select and prioritise outcomes across impact areas (soil health, water, biodiversity, climate)","Broad Theme":"Continuous improvement & farm plans","Regen Principle":"Enhanced Diversity","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"RTF p.9","Status":"Verified","Notes":null},{"Scheme":"Regenerating Together (SAI)","Company Type":"Standard","Requirement":"Practice adoption: select context-appropriate practices (no specific practice mandated)","Broad Theme":"Continuous improvement & farm plans","Regen Principle":"Context","Mandatory / Optional / Tiered":"Optional (menu)","Practice / Outcome / Evidence":"Practice-based","Source Citation":"RTF p.10","Status":"Verified","Notes":"'Rather than imposing specific practices'"},{"Scheme":"Regenerating Together (SAI)","Company Type":"Standard","Requirement":"Continuous Improvement Plan with SMART targets; set baselines; monitor over time","Broad Theme":"Continuous improvement & farm plans","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory (from engaging level)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"RTF p.11, 13","Status":"Verified","Notes":null},{"Scheme":"Regenerating Together (SAI)","Company Type":"Standard","Requirement":"Four performance levels: on-boarding, engaging, advancing, leading","Broad Theme":"Continuous improvement & farm plans","Regen Principle":"Context","Mandatory / Optional / Tiered":"Tiered","Practice / Outcome / Evidence":"Outcome-based","Source Citation":"RTF p.13","Status":"Verified","Notes":null},{"Scheme":"Regenerating Together (SAI)","Company Type":"Standard","Requirement":"On-boarding: complete context analysis; select 2 outcomes across >=2 impact areas","Broad Theme":"Continuous improvement & farm plans","Regen Principle":"Context","Mandatory / Optional / Tiered":"Tiered","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"RTF p.13","Status":"Verified","Notes":"Not claimable as regen status"},{"Scheme":"Regenerating Together (SAI)","Company Type":"Standard","Requirement":"Engaging: quantify baselines; set CIP; implement at least 2 practices","Broad Theme":"Continuous improvement & farm plans","Regen Principle":"Context","Mandatory / Optional / Tiered":"Tiered","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"RTF p.13","Status":"Verified","Notes":null},{"Scheme":"Regenerating Together (SAI)","Company Type":"Standard","Requirement":"Leading: at least 4 practices across all 4 impact areas; outcomes quantified over time","Broad Theme":"Continuous improvement & farm plans","Regen Principle":"Context","Mandatory / Optional / Tiered":"Tiered","Practice / Outcome / Evidence":"Outcome-based","Source Citation":"RTF p.13","Status":"Verified","Notes":null},{"Scheme":"Regenerating Together (SAI)","Company Type":"Standard","Requirement":"Select an indicator per outcome; data-collection strategy; quantify and monitor","Broad Theme":"Measurement & verification","Regen Principle":"Context","Mandatory / Optional / Tiered":"Mandatory","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"RTF p.11","Status":"Verified","Notes":null},{"Scheme":"Regenerating Together (SAI)","Company Type":"Standard","Requirement":"Third-party verification (assurance protocol) to make verified claims","Broad Theme":"Measurement & verification","Regen Principle":"Context","Mandatory / Optional / Tiered":"Optional (for claims)","Practice / Outcome / Evidence":"Evidence-based","Source Citation":"RTF p.14","Status":"Verified","Notes":"Protocol piloting from Jan 2025"}],"companies":[{"Company":"Wildfarmed","Company overview":"Regenerative food & farming business that contracts growers to produce lower-input wheat and markets branded flour/bread. Legal entity TRFF Limited.","Organisation type":"Private company (TRFF Ltd, co. 11566441)","Geography":"UK (and France)","Commodities":"Milling wheat / cereals; revenue from ingredient sales & grocery sales","Revenue":"Not disclosed (P&L omitted, small-co. exemption)","Revenue year":"2024","Revenue source":"TRFF Ltd unaudited accounts, period ended 31 Dec 2024 (Companies House, co. 11566441)","Scale metrics":"Trades as TRFF Ltd; 39 avg employees (2024); net assets £2.14m (2023: £0.69m); ~£14.5m share premium (equity raised); grower numbers not stated","Programme name":"Wildfarmed Regenerative Standards","Regenerative agriculture summary":"Wildfarmed is a regenerative food brand and grain buyer. It contracts growers directly and sells branded flour and bread to retailers and bakeries. Its standard asks growers to crop in mixtures, keep the ground covered and hold nitrogen low. Insecticides and fungicides are banned, herbicides are restricted, and livestock are integrated once in a three-year rotation.","Supply-chain model":"Direct grower contracts + branded flour to retail/bakery","Incentive model":"A fixed price or a premium above the market. Water companies pay extra, and growers receive agronomy and app support.","Verification model":"Third-party audit (Control Union); grain & leaf sampling","Data collected":"Practices, sap tests, nutrition applications; Soilmentor soil & biodiversity observations","Source confidence":"High (2023 standard) - but key input rules superseded","Notes & source gaps":"Filed accounts (TRFF Ltd, to 31 Dec 2024) confirm NO turnover is published - directors elected to omit the P&L under the small-companies regime. INTERNAL UPDATE (Jun 2026): glyphosate now permitted except as pre-harvest desiccant; N cap raised. Updated standard not in evidence base - re-verify","Tiered structure":"Not tiered. A single standard that all contracted growers must meet.","Website":"https://wildfarmed.com"},{"Company":"Regenified","Company overview":"Agricultural certification & land-verification company applying a tiered, outcome-scored standard.","Organisation type":"Private certification company","Geography":"US-origin; UK standard (global)","Commodities":"Multi-commodity arable & livestock","Revenue":"Not publicly disclosed","Revenue year":"-","Revenue source":"-","Scale metrics":"Five-tier system; UK-specific scale not stated in standard","Programme name":"Regenified 6-3-4 Verification Standard (UK)","Regenerative agriculture summary":"Regenified is an independent certification and verification body. It sits outside the supply chain and certifies farms for any buyer. Its five-tier standard tightens as a farm progresses. Each tier demands less tillage, wider rotations, more ground cover, nutrients at or below crop removal and lower pesticide use. The weakest principle sets the tier.","Supply-chain model":"Independent certification/verification (any supply chain)","Incentive model":"The right to use the Regenified seal from Tier 2, and the market access it brings.","Verification model":"Annual in-field evaluation + Verification Review Board; soil testing every 3 yrs","Data collected":"Field scoring (infiltration, ground cover %, species counts), lab soil-health panel, SOC","Source confidence":"High","Notes & source gaps":"Verified clause-by-clause against the standard","Tiered structure":"Tiered, with five levels. Each tier raises the share of land under regenerative practice and tightens limits on tillage, rotation and inputs. Farms must progress within three years, so the tiers track a transition.","Website":"https://regenified.com"},{"Company":"regenagri","Company overview":"Certification body (CIC) for regenerative agriculture, with an associated carbon standard; strong textile/fashion focus.","Organisation type":"Community Interest Company","Geography":"Global (UK-registered)","Commodities":"Arable, cotton/textiles, mixed","Revenue":"Not publicly disclosed","Revenue year":"-","Revenue source":"-","Scale metrics":"330,000+ farms; 2.2m+ ha globally (company-reported)","Programme name":"regenagri certification + regenagri Carbon Standard","Regenerative agriculture summary":"Regenagri is a certification body and carbon standard, run as a community interest company. It certifies farms and issues transaction certificates for supply-chain claims, with a strong textile focus. Farms must score at least 65 per cent: conservation tillage on a fifth of the land, a diverse rotation on three-quarters, a nutrient plan, soil analysis every three years and two landscape practices. The score must rise each year.","Supply-chain model":"Certification + supply-chain transaction certificates; carbon pathway","Incentive model":"A certification mark and logo licence. Carbon credits are available under ISO 14064/5.","Verification model":"Annual third-party certification audit","Data collected":"Scored criteria, soil analysis, synthetic input baselines, GHG calculator","Source confidence":"High","Notes & source gaps":"Continuous-improvement mechanics in separate Assessment Methodology doc (not reviewed)","Tiered structure":"Scored rather than tiered. One certification at 65 per cent, with each criterion banded and the score required to rise each year.","Website":"https://regenagri.org"},{"Company":"Soil Association","Company overview":"UK's leading organic membership charity and certification body.","Organisation type":"Charity + certification body","Geography":"GB / UK","Commodities":"All farm sectors (organic)","Revenue":"£21.5m (group income)","Revenue year":"2023/24","Revenue source":"Soil Association Annual Report & Accounts 2023/24","Scale metrics":"UK's largest organic certifier (organic land & licensees)","Programme name":"Soil Association Organic Standards (GB)","Regenerative agriculture summary":"Soil Association is an organic certification body and charity. It sits between farmer and market, licensing producers to use its organic symbol. Its regenerative overlap is soil health. Farmers must maintain and increase soil organic matter, build fertility through rotation, legumes and green manures, and prevent compaction, erosion and run-off. Synthetic nitrogen and pesticides are banned, manure nitrogen is capped at 170 kg per hectare, and tillage is not prescribed.","Supply-chain model":"Organic certification body","Incentive model":"The right to use the Soil Association organic symbol, and the market access it brings.","Verification model":"Annual physical inspection (+ >=10% unannounced/risk-based)","Data collected":"Input registers, annual cropping plan, inspection records","Source confidence":"High","Notes & source gaps":"Organic, not a dedicated regen scheme; regen-relevant clauses extracted via AI scan then source-verified","Tiered structure":"Not tiered. A single organic standard on a pass or fail basis.","Website":"https://www.soilassociation.org"},{"Company":"A Greener World","Company overview":"International non-profit running the 'Certified Regenerative by AGW' label, built to ISO/IEC 17065 principles.","Organisation type":"Non-profit certifier","Geography":"US-origin; international (UK presence)","Commodities":"All sectors (crops & livestock)","Revenue":"Not publicly disclosed","Revenue year":"-","Revenue source":"-","Scale metrics":"Certified farm numbers not stated in standard","Programme name":"Certified Regenerative by AGW","Regenerative agriculture summary":"A Greener World is a non-profit certifier. It certifies farms against its Certified Regenerative label, independent of any single buyer. Each farm works to a five-year Regenerative Plan, keeps living roots for at least eleven months and assesses soil every three years. An integrated crop management review precedes any pesticide use. Neonicotinoids and pre-harvest desiccation are banned, and synthetic fertiliser is phased out.","Supply-chain model":"Certification label","Incentive model":"The right to use the Certified Regenerative by AGW label.","Verification model":"Annual third-party audit (ISO/IEC 17065)","Data collected":"Soil-health indicators, biodiversity metric, carbon footprint, fuel/records (5-yr retention)","Source confidence":"High","Notes & source gaps":"Verified clause-by-clause; carbon footprint worded 'should' not 'must'","Tiered structure":"Not tiered. One certification, with progress shown through the five-year plan rather than levels.","Website":"https://agreenerworld.org.uk"},{"Company":"LEAF","Company overview":"Membership charity operating the LEAF Marque environmental assurance standard (Integrated Farm Management).","Organisation type":"Charity / environmental org","Geography":"UK-origin; international","Commodities":"All farm types","Revenue":"Not publicly disclosed","Revenue year":"-","Revenue source":"-","Scale metrics":"LEAF Marque used internationally; exact certified numbers not in standard","Programme name":"LEAF Marque (Standard v17.0)","Regenerative agriculture summary":"LEAF is an environmental charity running the LEAF Marque farm-assurance scheme. It certifies farms for retailers and food brands. Farms must hold assessments and plans for soil, nutrients, pest management, water and biodiversity, with pest decisions following the IPM pyramid. The more regenerative practices, such as living roots and soil-carbon measurement, sit at a higher, voluntary tier.","Supply-chain model":"Assurance certification (food label)","Incentive model":"The LEAF Marque label, and the retailer-driven market access it brings.","Verification model":"Annual third-party on-farm audit (accredited CB)","Data collected":"Annual soil-health monitoring, energy/GHG records, biodiversity assessment","Source confidence":"High (v17.0) - partial","Notes & source gaps":"Fetched text truncated at p.70/99; Section 7 habitat % (>=5%), Engaging Society & Livestock not fully captured","Tiered structure":"Two levels within one certification. Core control points are mandatory; Advanced points are voluntary and signal higher ambition.","Website":"https://www.leafmarque.eco"},{"Company":"Green Farm Collective","Company overview":"Farmer-founded UK cooperative creating markets for regeneratively grown crops; certified with Food Integrity Assurance.","Organisation type":"Farmer cooperative","Geography":"UK","Commodities":"Milling wheat (and wool)","Revenue":"Not publicly disclosed","Revenue year":"-","Revenue source":"-","Scale metrics":"Founder/lead farms; layered on a baseline scheme (e.g. Red Tractor)","Programme name":"Green Farm Collective Regenerative Wheat Standards","Regenerative agriculture summary":"The Green Farm Collective is a farmer-founded cooperative and grain supplier. It aggregates members' grain for buyers, with certification through Food Integrity Assurance. Its standard sits on top of a baseline scheme such as Red Tractor. Farms keep written plans, cap nitrogen at 180 kg per hectare, minimise soil disturbance and grow root crops no more than one year in seven. Pre-harvest glyphosate is banned, as are herbicides after full flag leaf emergence.","Supply-chain model":"Farmer cooperative + grain contracts (via FIA)","Incentive model":"A premium of 20 pounds per tonne, plus possible carbon and biodiversity revenues.","Verification model":"Self-assessment + independent spot-checks (Food Integrity Assurance)","Data collected":"Self-assessment records, input records, spot-check evidence","Source confidence":"Medium-High","Notes & source gaps":"Official standards page verified; workbook extras (6-crop rotation, no insecticides, max 2 fungicides, 11.5% protein) not on published page","Tiered structure":"Not tiered. A single standard layered on a baseline scheme.","Website":"https://www.greenfarmcollective.com"},{"Company":"Agreena","Company overview":"Soil-carbon fintech running AgreenaCarbon, Europe's largest soil-carbon programme.","Organisation type":"Private fintech / carbon programme","Geography":"Europe (HQ Denmark; 20 countries)","Commodities":"Arable crops","Revenue":"Not publicly disclosed (private)","Revenue year":"-","Revenue source":"Funding: EUR46m Series B (2023), AgFunder/Agreena","Scale metrics":"4.5m ha; ~2,300 farmers; 20 countries; EUR15m paid out (company-reported)","Programme name":"AgreenaCarbon","Regenerative agriculture summary":"Agreena is a soil-carbon fintech. It sits alongside the supply chain, paying farmers in carbon credits rather than crop premiums. Growers adopt one or more of four practices: less tillage, residue mulching, cover crops and organic fertiliser. Enrolment is flexible and field by field, and more land or practices earn more credits.","Supply-chain model":"Carbon-credit programme (not a supply chain)","Incentive model":"Verified carbon credits. Farmers keep them, sell them, or have Agreena broker them for a 15 per cent fee.","Verification model":"Satellite + AI MRV; Verra Verified Carbon Standard validation","Data collected":"Field location/size, 5-yr practice history, post-harvest field actuals","Source confidence":"Medium-High","Notes & source gaps":"Sourced from official website (no formal standard PDF reviewed); revenue not disclosed (funding shown instead)","Tiered structure":"Not tiered. Reward scales continuously: more practices and more hectares earn more credits.","Website":"https://agreena.com"},{"Company":"SAI Platform","Company overview":"Global non-profit industry association providing common sustainability tools to food & beverage members.","Organisation type":"Non-profit industry association","Geography":"Global","Commodities":"All crops","Revenue":"Not publicly disclosed","Revenue year":"-","Revenue source":"-","Scale metrics":"Membership of major F&B companies; FSA widely used in supply chains","Programme name":"Farm Sustainability Assessment (FSA) + Regenerating Together","Regenerative agriculture summary":"SAI Platform is a non-profit industry association. It gives its food and drink members tools to use across their own supply chains, rather than certifying farms itself. Neither tool dictates practices. The Farm Sustainability Assessment is a self-assessment scored Bronze to Gold. Regenerating Together is an outcome-based framework with four levels, from on-boarding to leading.","Supply-chain model":"Industry framework/tools implemented through members' supply chains","Incentive model":"A verified Bronze, Silver or Gold claim, and the market access it supports.","Verification model":"FSA: optional 3rd-party verification (MS audit every 3 yrs). RTF: third-party assurance protocol (from 2025)","Data collected":"Self-assessment answers, context-analysis scores, CIP targets, outcome indicators","Source confidence":"High","Notes & source gaps":"Both tools verified from official documents; thresholds in FSA Fig.7 are an image (partially verified)","Tiered structure":"Tiered in both tools. The FSA scores Bronze, Silver or Gold; Regenerating Together has four levels from on-boarding to leading. The levels recognise different starting points.","Website":"https://saiplatform.org"},{"Company":"Pladis","Company overview":"British biscuit & snacks manufacturer (McVitie's, Jacob's, Carr's); part of Yildiz Holding.","Organisation type":"Private food manufacturer","Geography":"UK HQ; 110+ countries","Commodities":"Milling/biscuit wheat","Revenue":"£3.23bn","Revenue year":"2024","Revenue source":"The Grocer / pladisglobal (2024)","Scale metrics":"34,000t grain from 4,000+ ha regen (H2025); 16,000 employees; 110+ countries","Programme name":"Back to Farm","Regenerative agriculture summary":"Pladis is a food manufacturer that owns McVitie's and other biscuit brands. As a downstream buyer, it sources wheat through Frontier and rewards growers via its Back to Farm programme. Farmers earn points for practices across rotation, nutrition, tillage, pest management and habitat. Points set a Bronze, Silver or Gold tier, and payment rises with the tier.","Supply-chain model":"Brand sourcing programme delivered via Frontier","Incentive model":"A payment per hectare that rises with the tier. Silver paid 80 pounds per hectare in 2025.","Verification model":"Self-reporting + audit, managed by Frontier","Data collected":"Practice points data, field/farm records","Source confidence":"Medium","Notes & source gaps":"Verified from a Farmers Weekly article that reproduces the official points table (secondary source)","Tiered structure":"Tiered, Bronze to Gold. Points set the tier and payment rises with it, rewarding existing practice and further progress.","Website":"https://www.pladisglobal.com"},{"Company":"ADM","Company overview":"Global agricultural commodity processor & ingredient supplier; UK milling via ADM Milling; ran Re:generations from 2023.","Organisation type":"Public agribusiness (NYSE)","Geography":"Global; UK programme","Commodities":"Milling wheat, barley, rapeseed (UK); global commodities","Revenue":"$85.53bn","Revenue year":"2024","Revenue source":"ADM FY2024 results (investors.adm.com / SEC)","Scale metrics":"Six UK flour mills; Re:generations launched 2023","Programme name":"Re:generations","Regenerative agriculture summary":"ADM is a global commodity processor and merchant. It sits midstream, processing and trading grain, and runs the Re:generations grower programme. Farmers choose from a menu of seven practices, none mandatory. Satellite monitoring and the Map of Agriculture platform check what is done. The model pays for action rather than enforcing a standard.","Supply-chain model":"Processor/merchant incentive programme","Incentive model":"A payment for each qualifying practice. The report does not state the rates.","Verification model":"Satellite remote-sensing + Map of Agriculture platform","Data collected":"Field practice data validated by satellite & Map of Ag","Source confidence":"Medium","Notes & source gaps":"Corporate report only; no per-practice £/ha rates stated; livestock not an EMEA practice","Tiered structure":"Not tiered. A menu of practices, each paid separately, with no levels.","Website":"https://www.adm.com"},{"Company":"Nestlé","Company overview":"World's largest food & beverage company; co-funds UK regen wheat (Wheat Plan) and authored its Agriculture Framework.","Organisation type":"Public food & beverage (SIX)","Geography":"Global","Commodities":"Dairy, coffee, cocoa, cereals (incl. wheat)","Revenue":"CHF 91.4bn","Revenue year":"2024","Revenue source":"Nestlé FY2024 full-year results","Scale metrics":"Targets 20% (2025) / 50% (2030) key ingredients from regenerative agriculture","Programme name":"Nestlé Agriculture Framework (Wheat Plan)","Regenerative agriculture summary":"Nestle is a global food and drink manufacturer. As a downstream brand owner, it sets a sourcing framework for its suppliers rather than certifying farms. The framework is a playbook, not a rulebook. It lists seventeen practices but names none as compulsory, and farms are assessed and graded across three levels.","Supply-chain model":"Corporate sourcing framework","Incentive model":"Support funded through the supply chain, for example LENs co-funding.","Verification model":"Farm assessment tool + grading; third-party where claims made","Data collected":"Farm assessment answers, carbon footprint (Cool Farm Tool), KPI indicators","Source confidence":"High (framework) / non-prescriptive","Notes & source gaps":"Verified from the framework; quantitative thresholds deferred to internal annexes not in document","Tiered structure":"Tiered by grading. Farms are graded engaged, advanced or leading to track supplier progress, not to pass or fail.","Website":"https://www.nestle.com"},{"Company":"Frontier Agriculture","Company overview":"UK's largest crop production & grain marketing business; JV of ABF & Cargill; delivers brands' regen programmes.","Organisation type":"Private agribusiness (JV)","Geography":"UK (England & Scotland)","Commodities":"Wheat, OSR, barley (combinable crops)","Revenue":"£1.72bn (group turnover)","Revenue year":"FY ended Jun 2025","Revenue source":"Frontier Annual Report 2025 / Companies House","Scale metrics":"~800 growers; 65,000 ha; 400,000t committed; 8 supply-chain programmes (H2025)","Programme name":"Frontier sustainable programmes (delivers Pladis, Warburtons, etc.)","Regenerative agriculture summary":"Frontier is a grain merchant and agronomy business. It sits midstream between farmers and food brands, and mostly delivers brands' programmes rather than its own. It runs two kinds: contracts that pay a premium for crop data, and schemes that pay per hectare for practices linked to emissions, soil and biodiversity. Growers must share data and be ready for audit.","Supply-chain model":"Merchant/intermediary running brands' programmes","Incentive model":"A payment per hectare, or a premium for data. Programmes average 70 to 80 pounds per hectare.","Verification model":"Audits + data collection/reporting","Data collected":"Crop production data, practice records","Source confidence":"Low-Medium","Notes & source gaps":"Only a general FW article supplied; specific practice thresholds (from a CPM Jul-2024 article) not in folder","Tiered structure":"Not tiered itself. It delivers other companies' programmes, which carry their own tiers or menus.","Website":"https://www.frontierag.co.uk"},{"Company":"Matthews Cotswold Flour","Company overview":"Eighth-generation family flour mill sourcing grain direct via the Cotswold Grain Partnership.","Organisation type":"Private family mill","Geography":"UK (Cotswolds)","Commodities":"Milling wheat (flour)","Revenue":"Not publicly disclosed","Revenue year":"-","Revenue source":"-","Scale metrics":"30,000-35,000t flour/yr; 150+ farms; 100+ flour types","Programme name":"Cotswold Grain Partnership regenerative standard","Regenerative agriculture summary":"Matthews Cotswold is a family flour miller. It buys grain direct from farms through its Cotswold Grain Partnership. Rather than prescribe practices, it asks farms to show progress against five outcomes: soil, carbon, water, biodiversity and food security. Nitrogen is capped at 180 kg per hectare and pre-harvest glyphosate is banned.","Supply-chain model":"Direct mill-to-farm partnership","Incentive model":"A premium that rises with years in the system and with nitrogen efficiency. Premiums can be stacked.","Verification model":"Independent third-party audit against the parameters","Data collected":"Soil OM tests; evidence for biodiversity/water (methodology not public)","Source confidence":"Medium","Notes & source gaps":"Verified from a FW article (secondary); company standards page not supplied; biodiversity/water methodology unspecified","Tiered structure":"Not tiered, but the premium scales. It rises with years in the system and with nitrogen efficiency.","Website":"https://www.cotswoldflour.com"},{"Company":"Landscape Enterprise Networks (LENs)","Company overview":"Collaborative initiative (managed by 3Keel) pooling funders to co-fund regenerative practices across shared landscapes.","Organisation type":"Collaborative funding initiative","Geography":"UK (7 regions incl. parts of Europe)","Commodities":"Arable & dairy (landscape-scale)","Revenue":"Not publicly disclosed","Revenue year":"-","Revenue source":"-","Scale metrics":"Active in 7 regions; whole-farm scope; third MRV year (2025)","Programme name":"LENs Resilience Pathway / MRV","Regenerative agriculture summary":"LENs is a collaborative funding initiative, managed by 3Keel. It sits across the value chain, pooling money from food companies, water firms and public bodies to pay farmers. It is a funding and measurement framework, not a practice standard. Funding comes as payment per practice during transition, or a set price per hectare for farms meeting thresholds.","Supply-chain model":"Co-funding pooled across food, water & public-sector funders","Incentive model":"A payment per practice during transition, or a set price per hectare under the Regen Pathway Premium.","Verification model":"Annual half-day MRV visit; SOC sampling; third-party limited GHG verification (ISO 14064-3) from 2025","Data collected":"Soil health, water, biodiversity, climate, economic-resilience data","Source confidence":"Medium (MRV only)","Notes & source gaps":"Supplied doc is an MRV protocol; practice rules NOT in source (workbook text was mis-copied from Soil Association)","Tiered structure":"Two funding tracks rather than tiers. Transition funding pays per practice; the Regen Pathway Premium pays a set price for farms meeting thresholds.","Website":"https://landscapeenterprisenetworks.com"}],"sourceGaps":[{"Scheme":"Green Farm Collective","Claim or Requirement":"Workbook extras: minimum six-crop rotation; no insecticides; max 2 fungicides + 1 PGR; 11.5% milling protein spec","Origin":"Both workbooks","Search / Check Performed":"Read official GFC Scheme Standards page","Result":"Not found on official page","Implication":"Core GFC standards now VERIFIED from source; these specific extra claims are not on the published standards page - treat as unverified"},{"Scheme":"LEAF Marque","Claim or Requirement":"At least 5% of farm managed as habitat (CP 7.3)","Origin":"Workbook 2","Search / Check Performed":"Fetched LEAF Marque v17.0; text truncated at p.70/99","Result":"Partially verified","Implication":"Most of Section 7, Engaging Society and Livestock not in fetched text; confirm 5% threshold against full standard"},{"Scheme":"Regenerating Together (SAI)","Claim or Requirement":"Distinct from FSA","Origin":"Workbook 1","Search / Check Performed":"Fetched RTF Narrative v1.1","Result":"Resolved","Implication":"Now sourced from the official framework; note SAI Platform also runs FSA, a separate tool also in evidence base"},{"Scheme":"LENs","Claim or Requirement":"All synthetic pesticides & herbicides prohibited; non-chemical weed control","Origin":"Workbook 1 #21","Search / Check Performed":"Read supplied LENs MRV Protocol in full","Result":"Contradicted / mis-sourced","Implication":"Workbook text is word-for-word the Soil Association entry; MRV doc has no practice rules"},{"Scheme":"Frontier","Claim or Requirement":"Specific thresholds: reduced till; ~10-15% N reduction; 5% habitat; hedgerow mgmt; GBP10/t","Origin":"Workbook 1 #2","Search / Check Performed":"Read supplied FW article (Apr 2025)","Result":"Not found in supplied doc","Implication":"From a CPM Jul-2024 article not in folder; only general structure verified"},{"Scheme":"ADM (Re:generations)","Claim or Requirement":"Per-practice GBP/ha rates (GBP8/ha; GBP4/ha livestock & biodiversity)","Origin":"Workbook 1 #3","Search / Check Performed":"Read supplied ADM 2025 report in full","Result":"Not found","Implication":"Report confirms payments exist but states no rates; livestock not an EMEA practice"},{"Scheme":"Wildfarmed","Claim or Requirement":"Glyphosate now permitted (and nitrogen cap raised) under updated standards","Origin":"Internal sources (Jun 2026)","Search / Check Performed":"Compared supplied 2023 standard with internal confirmation","Result":"Source out of date","Implication":"Supplied 2023 standard bans all herbicides and caps N at 80 kg/ha; internal sources confirm the UPDATED standards now permit glyphosate (e.g. for cover-crop termination) but NOT as a pre-harvest desiccant, and have increased the N cap. Updated standard not in evidence base - obtain and re-verify before publication."},{"Scheme":"Wildfarmed","Claim or Requirement":"'80kg N, 50/50 granular vs foliar'","Origin":"Workbook 2","Search / Check Performed":"Read DETAIL p.29 / Appendix","Result":"Partially corrected","Implication":"80kg cap confirmed; rule is granular <=40kg, remainder foliar (foliar preferred)"},{"Scheme":"Matthews Cotswold","Claim or Requirement":"'Four core objectives'","Origin":"Workbook 1 #5","Search / Check Performed":"Read supplied FW article","Result":"Partially contradicted","Implication":"Article lists FIVE parameters; adds 'Food security'"},{"Scheme":"FSA (SAI Platform)","Claim or Requirement":"Full tier matrix (Bronze=100% Essential; Gold=+>=75% Advanced)","Origin":"Workbook 1 #28","Search / Check Performed":"Read FSA framework v3.0","Result":"Partially verified","Implication":"Matrix is an image (Fig.7); only Silver 75% + N/A-as-YES confirmed in text"}],"sourceGapCols":["Scheme","Claim or Requirement","Origin","Search / Check Performed","Result","Implication"],"schemeToCompany":{"Wildfarmed":"Wildfarmed","Regenified":"Regenified","A Greener World":"A Greener World","regenagri":"regenagri","Soil Association Organic":"Soil Association","Pladis":"Pladis","LENs":"Landscape Enterprise Networks (LENs)","ADM (Re:generations)":"ADM","Nestle Agriculture Framework":"Nestlé","FSA (SAI Platform)":"SAI Platform","Frontier (programmes)":"Frontier Agriculture","Matthews Cotswold":"Matthews Cotswold Flour","Green Farm Collective":"Green Farm Collective","LEAF Marque":"LEAF","Agreena":"Agreena","Regenerating Together (SAI)":"SAI Platform"}};

const REQS = DATA.requirements;
const COMPANIES = DATA.companies;
const SOURCE_GAPS = DATA.sourceGaps;
const SOURCE_GAP_COLS = DATA.sourceGapCols;
const S2C = DATA.schemeToCompany;

/* ------------------------------------------------------------------ */
/*  Derivations (clearly-labelled, never invented)                     */
/* ------------------------------------------------------------------ */

// Status -> semantic token. Four real statuses exist in the data.
function statusMeta(s) {
  switch (s) {
    case "Verified": return { key: "verified", label: "Verified", varc: "--status-success" };
    case "Partially verified": return { key: "partial", label: "Partially verified", varc: "--status-warning" };
    case "Unverified": return { key: "unverified", label: "Unverified", varc: "--status-danger" };
    case "Verified (absence)": return { key: "absence", label: "Verified (absence)", varc: "--status-info" };
    default: return { key: "other", label: s || "—", varc: "--fg-2" };
  }
}

// Bucket the ~70 raw obligation strings into 4 filter buckets.
// The raw value is always shown verbatim in tables; this is filtering only.
function motBucket(raw) {
  if (!raw || raw === "-") return "Other";
  const l = raw.toLowerCase();
  if (l.startsWith("mandatory") || l.startsWith("mixed: mandatory")) return "Mandatory";
  if (l.startsWith("tiered")) return "Tiered";
  if (l.startsWith("optional")) return "Optional";
  return "Other";
}

// Source signal derived ONLY from the citation text. The dataset's own
// header states "(secondary) = journalistic source". This is indicative.
function sourceSignal(citation) {
  const c = (citation || "").toLowerCase();
  if (c.includes("(secondary)")) return "Secondary / trade press";
  return "Primary / official (per citation)";
}

// Enrich every requirement once.
const ENRICHED = REQS.map((r, i) => ({
  id: i,
  scheme: r["Scheme"],
  company: S2C[r["Scheme"]] || r["Scheme"],
  companyType: r["Company Type"],
  requirement: r["Requirement"],
  theme: r["Broad Theme"],
  principle: r["Regen Principle"],
  mot: r["Mandatory / Optional / Tiered"],
  motBucket: motBucket(r["Mandatory / Optional / Tiered"]),
  poe: r["Practice / Outcome / Evidence"],
  citation: r["Source Citation"],
  status: r["Status"],
  notes: r["Notes"],
  signal: sourceSignal(r["Source Citation"]),
}));

const EVERGREEN_RGB = "37,56,28";

/* ------------------------------------------------------------------ */
/*  Small shared UI                                                    */
/* ------------------------------------------------------------------ */

function StatusBadge({ status }) {
  const m = statusMeta(status);
  return (
    <span className={`badge badge-status badge-${m.key}`}>
      <span className="badge-dot" style={{ background: `var(${m.varc})` }} />
      {m.label}
    </span>
  );
}

function SignalBadge({ signal }) {
  const secondary = signal.startsWith("Secondary");
  return (
    <span className={`badge badge-signal ${secondary ? "sig-secondary" : "sig-primary"}`}>
      {signal}
    </span>
  );
}

function field(v) {
  return v === null || v === undefined || v === "" ? null : v;
}
function FieldRow({ label, value }) {
  const v = field(value);
  return (
    <div className="frow">
      <div className="frow-label eyebrow">{label}</div>
      <div className={"frow-value " + (v ? "" : "frow-empty")}>
        {v ? v : "Not available in current evidence base"}
      </div>
    </div>
  );
}

function Bars({ items, color = "--bramble-evergreen", showVal = true }) {
  const max = Math.max(1, ...items.map((d) => d.value));
  return (
    <div className="bars">
      {items.map((d) => (
        <div className="bar-row" key={d.label}>
          <div className="bar-label body-sm">{d.label}</div>
          <div className="bar-track">
            <div
              className="bar-fill"
              style={{ width: `${(d.value / max) * 100}%`, background: `var(${color})` }}
            />
          </div>
          {showVal && <div className="bar-val">{d.value}</div>}
        </div>
      ))}
    </div>
  );
}

/* Stacked vertical bar chart: principle x P/O/E */
function StackedBars({ data, segments }) {
  // data: [{ label, total, segments: { [segKey]: n } }, ...]
  // segments: [{ key, label, color }] in stack order (bottom → top)
  const max = Math.max(1, ...data.map((d) => d.total));
  const barW = 90;
  const slot = 150;            // bar + gap
  const inner = data.length * slot - (slot - barW);
  const padL = 30, padR = 30;
  const padT = 32, padB = 70;  // padT leaves room for the total label above each bar
  const chartH = 320;
  const totalW = padL + inner + padR;
  const totalH = padT + chartH + padB;

  return (
    <div className="stacked-wrap">
      <div className="stacked-legend">
        {segments.slice().reverse().map((s) => (
          <span className="legend-item" key={s.key}>
            <span className="legend-dot" style={{ background: `var(${s.color})` }} />
            {s.label}
          </span>
        ))}
      </div>
      <svg
        viewBox={`0 0 ${totalW} ${totalH}`}
        preserveAspectRatio="xMidYMid meet"
        className="stacked-svg"
        role="img"
        aria-label="Requirements by Regen Principle, split by Practice, Outcome and Evidence"
      >
        <line
          x1={padL}
          y1={padT + chartH}
          x2={padL + inner}
          y2={padT + chartH}
          stroke="var(--rule-strong)"
          strokeWidth="1"
        />
        {data.map((d, i) => {
          const x = padL + i * slot;
          const barH = (d.total / max) * chartH;
          const barY = padT + chartH - barH;
          let cursorY = barY;
          const parts = d.label.split(" ");
          return (
            <g key={d.label}>
              <text x={x + barW / 2} y={barY - 8} className="bar-total" textAnchor="middle">
                {d.total}
              </text>
              {segments.map((s) => {
                const v = d.segments[s.key] || 0;
                if (v === 0) return null;
                const segH = (v / d.total) * barH;
                const segY = cursorY;
                cursorY += segH;
                const pct = Math.round((v / d.total) * 100);
                return (
                  <g key={s.key}>
                    <rect x={x} y={segY} width={barW} height={segH} fill={`var(${s.color})`} />
                    {segH >= 18 && (
                      <text
                        x={x + barW / 2}
                        y={segY + segH / 2 + 4}
                        className="seg-label"
                        textAnchor="middle"
                      >
                        {pct}%
                      </text>
                    )}
                  </g>
                );
              })}
              <text
                x={x + barW / 2}
                y={padT + chartH + 22}
                className="bar-xlabel"
                textAnchor="middle"
              >
                {parts.length === 1 ? (
                  parts[0]
                ) : (
                  <>
                    <tspan x={x + barW / 2} dy={0}>{parts[0]}</tspan>
                    <tspan x={x + barW / 2} dy={16}>{parts.slice(1).join(" ")}</tspan>
                  </>
                )}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* Stacked status bar for a set of requirements */
function StatusStrip({ rows }) {
  const order = ["Verified", "Partially verified", "Verified (absence)", "Unverified"];
  const counts = order.map((s) => ({ s, n: rows.filter((r) => r.status === s).length }));
  const total = rows.length || 1;
  return (
    <div>
      <div className="statusbar" role="img" aria-label="Status breakdown">
        {counts.filter((c) => c.n > 0).map((c) => (
          <div
            key={c.s}
            className="statusbar-seg"
            style={{ width: `${(c.n / total) * 100}%`, background: `var(${statusMeta(c.s).varc})` }}
            title={`${c.s}: ${c.n}`}
          />
        ))}
      </div>
      <div className="statusbar-legend">
        {counts.filter((c) => c.n > 0).map((c) => (
          <span key={c.s} className="legend-item caption">
            <span className="badge-dot" style={{ background: `var(${statusMeta(c.s).varc})` }} />
            {statusMeta(c.s).label} · {c.n}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Detail panel (shared by Explorer + Company tabs)                   */
/* ------------------------------------------------------------------ */
function DetailPanel({ row, onClose }) {
  useEffect(() => {
    function esc(e) { if (e.key === "Escape") onClose(); }
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);
  if (!row) return null;
  const caution =
    row.status === "Unverified"
      ? "Source-gap lead. Do not use as verified evidence."
      : row.status === "Partially verified"
      ? "Partially verified. Confirm against the full source before relying on this in headline conclusions."
      : null;
  return (
    <div className="drawer-overlay" onMouseDown={onClose}>
      <aside className="drawer" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-label="Requirement detail">
        <div className="drawer-head">
          <div className="eyebrow">{row.scheme}</div>
          <button className="icon-btn" onClick={onClose} aria-label="Close detail panel">
            <X size={18} strokeWidth={1.75} />
          </button>
        </div>
        <h3 className="drawer-title">{row.requirement}</h3>
        <div className="drawer-badges">
          <StatusBadge status={row.status} />
          <SignalBadge signal={row.signal} />
        </div>
        {caution && (
          <div className={"caution " + (row.status === "Unverified" ? "caution-danger" : "caution-warn")}>
            <AlertTriangle size={15} strokeWidth={1.75} />
            <span>{caution}</span>
          </div>
        )}
        <hr className="rule" />
        <FieldRow label="Broad theme" value={row.theme} />
        <FieldRow label="Mandatory / optional / tiered" value={row.mot} />
        <FieldRow label="Practice / outcome / evidence" value={row.poe} />
        <FieldRow label="Source citation" value={row.citation} />
        <FieldRow label="Notes" value={row.notes} />
        <hr className="rule" />
        <div className="caption frow-empty" style={{ marginTop: "var(--space-2)" }}>
          Source signal is indicative, derived from the citation text. The
          evidence base does not hold a discrete source-type column.
        </div>
      </aside>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Five broader asks of farmers across the programmes                 */
/* ------------------------------------------------------------------ */
const FIVE_ASKS = [
  {
    title: "Evidence-based MRV: field-level soil health and soil carbon trajectory",
    ask: "Measure and evidence the condition and trajectory of soil, particularly soil organic matter / soil organic carbon, using repeatable field or lab methods.",
    evidence: [
      "soil organic matter or soil organic carbon results",
      "soil sampling locations and repeat sampling",
      "soil structure, compaction or erosion observations",
      "biological indicators such as respiration, microbial biomass, Haney, PLFA or equivalent",
      "trend over time, not just one-off measurement",
    ],
  },
  {
    title: "Practice-based transition: reduced soil disturbance and continuous soil cover",
    ask: "Keep soil protected by reducing physical disturbance and maintaining living or residual cover for more of the year.",
    evidence: [
      "tillage method by field and crop",
      "number of cultivations or tillage passes / periods",
      "use of cover crops, catch crops or companion crops",
      "length of bare-soil period",
      "overwinter cover or living-root presence",
      "residue retention or chopped straw",
    ],
  },
  {
    title: "Practice-based system design: crop diversity, rotation complexity and biological cropping systems",
    ask: "Increase biological and rotational diversity in the productive crop system.",
    evidence: [
      "number of crops in rotation",
      "inclusion of legumes or break crops",
      "companion cropping or intercropping",
      "multi-species cover crops",
      "crop functional groups",
      "perennial or grass ley inclusion where relevant",
    ],
  },
  {
    title: "Practice and evidence-based input stewardship: nitrogen, fertiliser and pesticide reduction",
    ask: "Show that synthetic inputs are planned, justified, reduced where possible, and not used in prohibited ways.",
    evidence: [
      "nitrogen rate per hectare",
      "fertiliser type, timing and application records",
      "nutrient management plan",
      "soil or sap testing to justify inputs",
      "nitrogen use efficiency or yield per kg N",
      "pesticide application records",
      "integrated pest management plan",
      "active ingredient reductions",
      "pre-harvest glyphosate or desiccant restrictions",
      "bans or restrictions on insecticides, fungicides, neonicotinoids or highly hazardous pesticides",
    ],
  },
  {
    title: "Practice and outcome-based landscape improvement: biodiversity, habitat and water function",
    ask: "Demonstrate improvement or protection of biodiversity and water function at field, farm or landscape level.",
    evidence: [
      "percentage of farmed area in habitat",
      "hedgerows, margins, buffer strips or riparian buffers",
      "biodiversity plans or biodiversity metrics",
      "evidence of beneficial insects, birds, wildlife or plant diversity",
      "watercourse protection",
      "runoff, erosion and sedimentation controls",
      "infiltration, water-holding capacity or water quality indicators",
    ],
  },
];

function FiveAsks() {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <section className="five-asks">
      <div className="eyebrow section-eyebrow">Five broader asks of farmers</div>
      <p className="body-sm" style={{ marginTop: 0, maxWidth: 760 }}>
        Across the 16 schemes, farmer-facing requirements cluster into five recurring asks.
        Click each to see the common request and the evidence typically required.
      </p>
      <ol className="ask-list">
        {FIVE_ASKS.map((a, i) => {
          const open = openIdx === i;
          return (
            <li key={i} className={"ask-item" + (open ? " is-open" : "")}>
              <button
                className="ask-head"
                onClick={() => setOpenIdx(open ? null : i)}
                aria-expanded={open}
                aria-controls={`ask-body-${i}`}
              >
                <span className="ask-n">{i + 1}</span>
                <span className="ask-title">{a.title}</span>
                <ChevronDown
                  size={18}
                  strokeWidth={1.75}
                  className="ask-caret"
                  style={{ transform: open ? "rotate(180deg)" : "none" }}
                />
              </button>
              {open && (
                <div className="ask-body" id={`ask-body-${i}`}>
                  <div className="ask-section">
                    <div className="eyebrow">Common ask</div>
                    <p className="ask-text">{a.ask}</p>
                  </div>
                  <div className="ask-section">
                    <div className="eyebrow">Typical evidence requested</div>
                    <ul className="ask-evidence">
                      {a.evidence.map((e) => <li key={e}>{e}</li>)}
                    </ul>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  TAB 1 — SUMMARY                                                    */
/* ------------------------------------------------------------------ */
function SummaryTab({ onPickCompany }) {
  const counts = useMemo(() => {
    const by = (f) => ENRICHED.reduce((m, r) => { const k = f(r); m[k] = (m[k] || 0) + 1; return m; }, {});
    const status = by((r) => r.status);
    const theme = by((r) => r.theme);
    const provider = by((r) => r.scheme);
    return {
      total: ENRICHED.length,
      verified: status["Verified"] || 0,
      partial: status["Partially verified"] || 0,
      absence: status["Verified (absence)"] || 0,
      unverified: status["Unverified"] || 0,
      providers: Object.keys(provider).length,
      themes: Object.keys(theme).length,
      secondary: ENRICHED.filter((r) => r.signal.startsWith("Secondary")).length,
      themeBars: Object.entries(theme).map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value),
      provBars: Object.entries(provider).map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value),
    };
  }, []);

  // Principle x P/O/E stacked-bar data
  const principleStack = useMemo(() => {
    const ORDER = [
      "Context",
      "Minimised Disturbance",
      "Soil Cover",
      "Living Roots",
      "Enhanced Diversity",
      "Livestock Integration",
    ];
    const acc = {};
    ENRICHED.forEach((r) => {
      const p = r.principle;
      if (!p) return;
      acc[p] = acc[p] || { Evidence: 0, Practice: 0, Outcome: 0 };
      if (r.poe === "Evidence-based") acc[p].Evidence += 1;
      else if (r.poe === "Practice-based") acc[p].Practice += 1;
      else if (r.poe === "Outcome-based") acc[p].Outcome += 1;
    });
    return ORDER.filter((p) => acc[p]).map((p) => ({
      label: p,
      total: acc[p].Evidence + acc[p].Practice + acc[p].Outcome,
      segments: acc[p],
    }));
  }, []);
  const principleSegments = [
    { key: "Evidence", label: "Evidence-based (planning & audits)", color: "--bramble-mustard" },
    { key: "Practice", label: "Practice-based", color: "--bramble-claret" },
    { key: "Outcome", label: "Outcome-based", color: "--bramble-evergreen" },
  ];

  // heatmap: provider x theme
  const themes = counts.themeBars.map((t) => t.label);
  const providers = counts.provBars.map((p) => p.label);
  const matrix = useMemo(() => {
    const m = {};
    providers.forEach((p) => { m[p] = {}; themes.forEach((t) => (m[p][t] = 0)); });
    ENRICHED.forEach((r) => { if (m[r.scheme]) m[r.scheme][r.theme] = (m[r.scheme][r.theme] || 0) + 1; });
    return m;
  }, [providers, themes]);
  const cellMax = Math.max(1, ...providers.flatMap((p) => themes.map((t) => matrix[p][t])));
  const heatProviders = [...providers].sort((a, b) => a.localeCompare(b));

  const kpis = [
    { n: counts.providers, l: "Schemes analysed" },
    { n: counts.total, l: "Requirements extracted" },
    { n: counts.verified, l: "Verified" },
    { n: counts.partial, l: "Partially verified" },
    { n: counts.absence + counts.unverified, l: "Source-gap / absence-verified" },
    { n: counts.themes, l: "Broad themes" },
  ];

  const topThemes = counts.themeBars.slice(0, 3).map((t) => t.label).join(", ");

  return (
    <div>
      <section className="hero">
        <img
          className="tab-motif"
          src="./assets/illustrations/leaf-large.png"
          alt=""
          aria-hidden="true"
        />
        <div className="eyebrow">Evidence base · Phase 1</div>
        <h1 className="display hero-title">Regenerative Programme Review</h1>
        <p className="body-lg hero-sub">
          A comparative evidence base of farmer-facing requirements across
          standards, schemes and supply-chain programmes. Requirement-level
          extraction spanning {counts.providers} schemes and {COMPANIES.length} organisations.
        </p>
        <div className="hero-note caption">
          Evidence base distinguishes verified requirements from source-gap leads.
          Items marked as source-gap leads are retained for transparency but
          should not be used in headline conclusions.
        </div>
      </section>

      <hr className="rule" />

      <FiveAsks />

      <hr className="rule" />

      <div className="eyebrow section-eyebrow">Evidence base</div>
      <div className="kpi-grid">
        {kpis.map((k) => (
          <div className="kpi" key={k.l}>
            <div className="kpi-num">{k.n}</div>
            <div className="kpi-label">{k.l}</div>
          </div>
        ))}
      </div>

      <section>
        <div className="eyebrow section-eyebrow">Theme coverage</div>
        <p className="caption" style={{ marginTop: 0, maxWidth: 760 }}>
          Requirements grouped by the six regen principles in the V7 matrix, split by whether each
          requirement is practice-, outcome-, or evidence-based (planning &amp; audits).
        </p>
        <StackedBars data={principleStack} segments={principleSegments} />
      </section>

      <section>
        <div className="eyebrow section-eyebrow">Provider coverage</div>
        <Bars items={counts.provBars} color="--bramble-olive" />
      </section>

      <section>
        <div className="eyebrow section-eyebrow">Status breakdown</div>
        <StatusStrip rows={ENRICHED} />
      </section>

      <section>
        <div className="eyebrow section-eyebrow">Provider-by-theme coverage</div>
        <p className="caption" style={{ marginTop: 0 }}>
          Cell value is the count of extracted requirements. Intensity is relative; an empty
          cell means no requirement was extracted for that pairing, not that the theme is absent
          from the programme.
        </p>
        <div className="heat-wrap">
          <table className="heat">
            <thead>
              <tr>
                <th className="heat-corner"></th>
                {themes.map((t) => <th key={t} className="heat-col"><span>{t}</span></th>)}
              </tr>
            </thead>
            <tbody>
              {heatProviders.map((p) => (
                <tr key={p}>
                  <th className="heat-rowlab" onClick={() => onPickCompany(S2C[p])}>
                    {p}
                  </th>
                  {themes.map((t) => {
                    const v = matrix[p][t];
                    const ratio = v / cellMax;
                    return (
                      <td
                        key={t}
                        className="heat-cell"
                        style={{
                          background: v ? `rgba(${EVERGREEN_RGB},${0.1 + 0.78 * ratio})` : "transparent",
                          color: ratio > 0.5 ? "var(--bramble-bone)" : "var(--fg-1)",
                        }}
                        title={`${p} · ${t}: ${v}`}
                      >
                        {v || ""}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <div className="eyebrow section-eyebrow">Common patterns</div>
        <ul className="insights">
          <li>
            The most frequently represented themes are {topThemes}, measured by
            extracted requirement count across all schemes.
          </li>
          <li>
            Of {counts.total} requirements, {counts.verified} are verified against a source
            document and {counts.partial} are partially verified. {counts.unverified} remain
            unverified and {counts.absence} record a verified absence; these are excluded from headline conclusions.
          </li>
          <li>
            {counts.secondary} requirements rest on a citation marked secondary (journalistic),
            shown throughout as an indicative source signal rather than treated as equivalent to an official standard.
          </li>
        </ul>
      </section>

      <section className="discipline">
        <div className="eyebrow section-eyebrow">Source discipline</div>
        <p className="body-sm">
          Official standards, frameworks and corporate programme documents are treated as
          stronger evidence than trade press or workbook leads. Unverified claims are never
          treated as evidence and never enter headline conclusions unless clearly labelled.
          Missing fields are shown as not available rather than inferred. Source citations are
          preserved verbatim from the matrix.
        </p>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  TAB 2 — REQUIREMENT EXPLORER                                       */
/* ------------------------------------------------------------------ */
const POE_OPTS = ["Practice-based", "Outcome-based", "Evidence-based"];
const MOT_OPTS = ["Mandatory", "Optional", "Tiered", "Other"];
const STATUS_OPTS = ["Verified", "Partially verified", "Verified (absence)", "Unverified"];
const SIGNAL_OPTS = ["Primary / official (per citation)", "Secondary / trade press"];

function ExplorerTab() {
  const schemes = useMemo(() => [...new Set(ENRICHED.map((r) => r.scheme))].sort(), []);
  const themes = useMemo(() => [...new Set(ENRICHED.map((r) => r.theme))].sort(), []);
  const [q, setQ] = useState("");
  const [fScheme, setFScheme] = useState("");
  const [fTheme, setFTheme] = useState("");
  const [fMot, setFMot] = useState("");
  const [fPoe, setFPoe] = useState("");
  const [fStatus, setFStatus] = useState("");
  const [fSignal, setFSignal] = useState("");
  const [sortKey, setSortKey] = useState("scheme");
  const [sortDir, setSortDir] = useState("asc");
  const [open, setOpen] = useState(null);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    let out = ENRICHED.filter((r) => {
      if (fScheme && r.scheme !== fScheme) return false;
      if (fTheme && r.theme !== fTheme) return false;
      if (fMot && r.motBucket !== fMot) return false;
      if (fPoe && r.poe !== fPoe) return false;
      if (fStatus && r.status !== fStatus) return false;
      if (fSignal && r.signal !== fSignal) return false;
      if (term) {
        const hay = [r.scheme, r.requirement, r.theme, r.citation, r.notes, r.poe, r.mot]
          .map((x) => (x || "").toLowerCase()).join(" ");
        if (!hay.includes(term)) return false;
      }
      return true;
    });
    const dir = sortDir === "asc" ? 1 : -1;
    out = [...out].sort((a, b) => {
      const va = (a[sortKey] || "").toString().toLowerCase();
      const vb = (b[sortKey] || "").toString().toLowerCase();
      return va < vb ? -dir : va > vb ? dir : 0;
    });
    return out;
  }, [q, fScheme, fTheme, fMot, fPoe, fStatus, fSignal, sortKey, sortDir]);

  const chips = [
    fScheme && { k: "scheme", label: fScheme, clear: () => setFScheme("") },
    fTheme && { k: "theme", label: fTheme, clear: () => setFTheme("") },
    fMot && { k: "mot", label: fMot, clear: () => setFMot("") },
    fPoe && { k: "poe", label: fPoe, clear: () => setFPoe("") },
    fStatus && { k: "status", label: fStatus, clear: () => setFStatus("") },
    fSignal && { k: "signal", label: fSignal, clear: () => setFSignal("") },
    q && { k: "q", label: `“${q}”`, clear: () => setQ("") },
  ].filter(Boolean);

  function clearAll() {
    setQ(""); setFScheme(""); setFTheme(""); setFMot(""); setFPoe(""); setFStatus(""); setFSignal("");
  }
  function sortBy(k) {
    if (sortKey === k) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(k); setSortDir("asc"); }
  }
  const Th = ({ label, k }) => (
    <th className={"sortable " + (sortKey === k ? "active" : "")} onClick={() => sortBy(k)}>
      <span>{label}</span>
      <ArrowUpDown size={12} strokeWidth={1.75} />
    </th>
  );

  return (
    <div>
      <img
        className="tab-motif"
        src="./assets/illustrations/hoverfly.png"
        alt=""
        aria-hidden="true"
      />
      <div className="eyebrow section-eyebrow">Requirement explorer</div>
      <p className="body-sm" style={{ marginTop: 0, maxWidth: 720 }}>
        Search, filter and inspect every extracted requirement. Source-gap leads are kept visible
        and flagged; they should not be used as verified evidence.
      </p>

      <div className="explorer">
        <aside className="filters" aria-label="Filters">
          <div className="filters-head">
            <span className="eyebrow"><SlidersHorizontal size={13} strokeWidth={1.75} /> Filters</span>
            <button className="link-btn" onClick={clearAll}>Clear filters</button>
          </div>

          <label className="searchbox">
            <Search size={16} strokeWidth={1.75} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search requirements, citations, notes"
              aria-label="Search requirements"
            />
            {q && <button className="icon-btn" onClick={() => setQ("")} aria-label="Clear search"><X size={14} /></button>}
          </label>

          <FilterSelect label="Provider / scheme" value={fScheme} onChange={setFScheme} options={schemes} />
          <FilterSelect label="Broad theme" value={fTheme} onChange={setFTheme} options={themes} />
          <FilterSelect label="Obligation" value={fMot} onChange={setFMot} options={MOT_OPTS} />
          <FilterSelect label="Requirement type" value={fPoe} onChange={setFPoe} options={POE_OPTS} />
          <FilterSelect label="Status" value={fStatus} onChange={setFStatus} options={STATUS_OPTS} />
          <FilterSelect label="Source signal (indicative)" value={fSignal} onChange={setFSignal} options={SIGNAL_OPTS} />
        </aside>

        <div className="results">
          <div className="results-bar">
            <span className="rowcount">{filtered.length} of {ENRICHED.length} requirements</span>
            <div className="chips">
              {chips.map((c) => (
                <button key={c.k} className="chip" onClick={c.clear}>
                  {c.label} <X size={12} strokeWidth={2} />
                </button>
              ))}
            </div>
          </div>

          <div className="tbl-wrap">
            <table className="tbl">
              <thead>
                <tr>
                  <Th label="Scheme" k="scheme" />
                  <th>Requirement</th>
                  <Th label="Theme" k="theme" />
                  <th>Obligation</th>
                  <Th label="Type" k="poe" />
                  <Th label="Status" k="status" />
                  <th>Source citation</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr
                    key={r.id}
                    className={"row " + (r.status === "Unverified" ? "row-unverified" : "")}
                    onClick={() => setOpen(r)}
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === "Enter") setOpen(r); }}
                  >
                    <td className="cell-scheme">{r.scheme}</td>
                    <td className="cell-req">{r.requirement}</td>
                    <td>{r.theme}</td>
                    <td className="cell-mot">{r.mot}</td>
                    <td>{r.poe}</td>
                    <td><StatusBadge status={r.status} /></td>
                    <td className="cell-cite">{r.citation}</td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={7} className="empty-row">No requirements match these filters. Adjust or clear filters to see more.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <DetailPanel row={open} onClose={() => setOpen(null)} />
    </div>
  );
}

function FilterSelect({ label, value, onChange, options }) {
  return (
    <div className="filter-group">
      <label className="eyebrow">{label}</label>
      <div className="select-wrap">
        <select value={value} onChange={(e) => onChange(e.target.value)} aria-label={label}>
          <option value="">All</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronRight size={14} strokeWidth={1.75} className="select-caret" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  TAB 3 — COMPANY DEEP DIVES                                         */
/* ------------------------------------------------------------------ */
function CompanyTab({ selected, setSelected }) {
  const [open, setOpen] = useState(null);
  const names = useMemo(() => COMPANIES.map((c) => c["Company"]).sort(), []);
  const company = useMemo(() => COMPANIES.find((c) => c["Company"] === selected) || null, [selected]);
  const rows = useMemo(() => ENRICHED.filter((r) => r.company === selected), [selected]);

  if (!selected || !company) {
    return (
      <div>
        <img
          className="tab-motif"
          src="./assets/illustrations/walnut.png"
          alt=""
          aria-hidden="true"
        />
        <div className="eyebrow section-eyebrow">Company deep dives</div>
        <p className="body-sm" style={{ marginTop: 0, maxWidth: 720 }}>
          Select a provider to see a briefing-note profile, its regenerative position and supply-chain
          model, and every linked requirement.
        </p>
        <div className="company-grid">
          {[...COMPANIES].sort((a, b) => a["Company"].localeCompare(b["Company"])).map((c) => {
            const n = ENRICHED.filter((r) => r.company === c["Company"]).length;
            return (
              <button key={c["Company"]} className="company-card" onClick={() => setSelected(c["Company"])}>
                <div className="company-card-name">{c["Company"]}</div>
                <div className="caption">{field(c["Programme name"]) || "Programme not named in evidence base"}</div>
                <div className="company-card-foot">
                  <span className="caption">{n} requirement{n === 1 ? "" : "s"}</span>
                  <ChevronRight size={15} strokeWidth={1.75} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const themeCounts = {};
  rows.forEach((r) => {
    const t = (themeCounts[r.theme] = themeCounts[r.theme] || { n: 0, v: 0, p: 0, u: 0, a: 0 });
    t.n++;
    if (r.status === "Verified") t.v++;
    else if (r.status === "Partially verified") t.p++;
    else if (r.status === "Unverified") t.u++;
    else if (r.status === "Verified (absence)") t.a++;
  });
  const themeRows = Object.entries(themeCounts).map(([theme, c]) => ({ theme, ...c })).sort((a, b) => b.n - a.n);
  const dominant = themeRows[0] ? themeRows[0].theme : "—";

  const k = {
    total: rows.length,
    v: rows.filter((r) => r.status === "Verified").length,
    p: rows.filter((r) => r.status === "Partially verified").length,
    u: rows.filter((r) => r.status === "Unverified").length,
    a: rows.filter((r) => r.status === "Verified (absence)").length,
    themes: themeRows.length,
  };

  const gapRows = rows.filter((r) => r.status !== "Verified");
  const companyGaps = SOURCE_GAPS.filter((g) => {
    const gs = (g[SOURCE_GAP_COLS[0]] || "");
    return S2C[gs] === selected || gs === selected || gs.includes(selected) || selected.includes(gs);
  });
  const blankFields = Object.entries(company).filter(([key, val]) => key !== "Company" && !field(val)).map(([key]) => key);
  const lowConf = /low/i.test(company["Source confidence"] || "");

  return (
    <div>
      <button className="back-btn" onClick={() => setSelected(null)}>
        <ChevronRight size={14} strokeWidth={2} style={{ transform: "rotate(180deg)" }} /> All providers
      </button>

      <div className="company-head">
        <div>
          <div className="eyebrow">{field(company["Organisation type"]) || "Organisation type not stated"}</div>
          <h1 className="display company-title">{company["Company"]}</h1>
          <p className="body-lg" style={{ maxWidth: 760, marginTop: "var(--space-3)" }}>
            {field(company["Company overview"]) || "Not available in current evidence base"}
          </p>
        </div>
      </div>

      {/* KPIs */}
      <div className="kpi-grid company-kpi">
        <div className="kpi"><div className="kpi-num">{k.total}</div><div className="kpi-label">Requirements</div></div>
        <div className="kpi"><div className="kpi-num">{k.v}</div><div className="kpi-label">Verified</div></div>
        <div className="kpi"><div className="kpi-num">{k.p}</div><div className="kpi-label">Partially verified</div></div>
        <div className="kpi"><div className="kpi-num">{k.u + k.a}</div><div className="kpi-label">Source-gap / absence</div></div>
        <div className="kpi"><div className="kpi-num">{k.themes}</div><div className="kpi-label">Themes covered</div></div>
        <div className="kpi"><div className="kpi-num kpi-text">{dominant}</div><div className="kpi-label">Dominant theme</div></div>
      </div>

      <div className="two-col">
        <section className="panel">
          <div className="eyebrow section-eyebrow">Company overview</div>
          <FieldRow label="Programme name" value={company["Programme name"]} />
          <FieldRow label="Organisation type" value={company["Organisation type"]} />
          <FieldRow label="Geography" value={company["Geography"]} />
          <FieldRow label="Commodities" value={company["Commodities"]} />
          <FieldRow label="Revenue" value={company["Revenue"]} />
          <FieldRow label="Revenue year" value={company["Revenue year"]} />
          <FieldRow label="Revenue source" value={company["Revenue source"]} />
          <FieldRow label="Scale metrics" value={company["Scale metrics"]} />
          <FieldRow label="Source confidence" value={company["Source confidence"]} />
        </section>

        <section className="panel">
          <div className="eyebrow section-eyebrow">Regenerative agriculture position</div>
          <FieldRow label="Programme name" value={company["Programme name"]} />
          <FieldRow label="Regenerative summary" value={company["Regenerative agriculture summary"]} />
          <FieldRow label="Tiered structure" value={company["Tiered structure"]} />
          <FieldRow label="Source confidence" value={company["Source confidence"]} />

          <div className="eyebrow section-eyebrow" style={{ marginTop: "var(--space-6)" }}>Supply-chain model</div>
          <FieldRow label="Supply-chain model" value={company["Supply-chain model"]} />
          <FieldRow label="Incentive model" value={company["Incentive model"]} />
          <FieldRow label="Verification model" value={company["Verification model"]} />
          <FieldRow label="Data collected" value={company["Data collected"]} />
        </section>
      </div>

      <section>
        <div className="eyebrow section-eyebrow">Theme coverage</div>
        <div className="tbl-wrap">
          <table className="tbl compact">
            <thead>
              <tr><th>Broad theme</th><th>Requirements</th><th>Verified</th><th>Partially</th><th>Unverified / absence</th></tr>
            </thead>
            <tbody>
              {themeRows.map((t) => (
                <tr key={t.theme}>
                  <td>{t.theme}</td><td>{t.n}</td><td>{t.v}</td><td>{t.p}</td><td>{t.u + t.a}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <div className="eyebrow section-eyebrow">Requirements</div>
        <div className="tbl-wrap">
          <table className="tbl">
            <thead>
              <tr><th>Requirement</th><th>Theme</th><th>Obligation</th><th>Type</th><th>Status</th><th>Source citation</th></tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className={"row " + (r.status === "Unverified" ? "row-unverified" : "")} onClick={() => setOpen(r)} tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter") setOpen(r); }}>
                  <td className="cell-req">{r.requirement}</td>
                  <td>{r.theme}</td>
                  <td className="cell-mot">{r.mot}</td>
                  <td>{r.poe}</td>
                  <td><StatusBadge status={r.status} /></td>
                  <td className="cell-cite">{r.citation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel gap-panel">
        <div className="eyebrow section-eyebrow">Source gaps and cautions</div>
        {(lowConf || companyGaps.length > 0 || gapRows.length > 0) && (
          <div className="caution caution-warn" style={{ marginBottom: "var(--space-5)" }}>
            <AlertTriangle size={15} strokeWidth={1.75} />
            <span>
              Some information for this provider rests on non-official, partial or incomplete
              documentation. Treat source-gap leads as prompts for further verification, not as evidence.
            </span>
          </div>
        )}
        <FieldRow label="Source confidence" value={company["Source confidence"]} />
        <FieldRow label="Notes & source gaps" value={company["Notes & source gaps"]} />
        <div className="frow">
          <div className="frow-label eyebrow">Blank profile fields</div>
          <div className={"frow-value " + (blankFields.length ? "" : "frow-empty")}>
            {blankFields.length ? blankFields.join(", ") : "None — all profile fields populated"}
          </div>
        </div>
        <div className="frow">
          <div className="frow-label eyebrow">Requirements needing care</div>
          <div className="frow-value">
            {gapRows.length
              ? `${gapRows.length} of ${rows.length} requirements are partially verified, unverified, or record a verified absence.`
              : "All extracted requirements are verified against a source document."}
          </div>
        </div>

        {companyGaps.length > 0 && (
          <div style={{ marginTop: "var(--space-5)" }}>
            <div className="eyebrow" style={{ marginBottom: "var(--space-3)" }}>Linked source-gap register entries</div>
            {companyGaps.map((g, i) => (
              <div key={i} className="gap-entry">
                <div className="gap-claim">{g[SOURCE_GAP_COLS[1]]}</div>
                <div className="gap-meta caption">
                  <span><strong>Result:</strong> {g[SOURCE_GAP_COLS[4]]}</span>
                  <span><strong>Implication:</strong> {g[SOURCE_GAP_COLS[5]]}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <DetailPanel row={open} onClose={() => setOpen(null)} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  TAB 4 — SOURCE GAPS & EVIDENCE                                     */
/* ------------------------------------------------------------------ */
function SourceTab() {
  const totals = useMemo(() => {
    const c = (f) => ENRICHED.filter(f).length;
    return {
      total: ENRICHED.length,
      verified: c((r) => r.status === "Verified"),
      partial: c((r) => r.status === "Partially verified"),
      absence: c((r) => r.status === "Verified (absence)"),
      unverified: c((r) => r.status === "Unverified"),
      primary: c((r) => r.signal.startsWith("Primary")),
      secondary: c((r) => r.signal.startsWith("Secondary")),
    };
  }, []);

  const careRows = ENRICHED.filter((r) => r.status !== "Verified" || r.signal.startsWith("Secondary"))
    .sort((a, b) => a.scheme.localeCompare(b.scheme));

  function confBucket(text) {
    const t = (text || "").toLowerCase();
    if (t.startsWith("high")) return { b: "High", varc: "--status-success" };
    if (t.startsWith("low")) return { b: "Low", varc: "--status-danger" };
    if (t.includes("low")) return { b: "Low–Medium", varc: "--status-warning" };
    return { b: "Medium", varc: "--status-warning" };
  }

  const evidence = [
    { n: totals.total, l: "Requirements in evidence base" },
    { n: totals.verified, l: "Verified against source" },
    { n: totals.partial, l: "Partially verified" },
    { n: totals.absence, l: "Verified absence" },
    { n: totals.unverified, l: "Unverified / source-gap" },
    { n: totals.secondary, l: "Resting on secondary citation" },
  ];

  return (
    <div>
      <img
        className="tab-motif"
        src="./assets/illustrations/skylark-feather.png"
        alt=""
        aria-hidden="true"
      />
      <div className="eyebrow section-eyebrow">Source gaps &amp; evidence</div>
      <p className="body-sm" style={{ marginTop: 0, maxWidth: 760 }}>
        The evidence base is held to source discipline. The matrix does not carry a discrete
        source-type or source-document column, so evidence quality is represented through three
        signals retained verbatim from the data: per-row verification status, an indicative
        primary-versus-secondary signal derived from the citation text, and the explicit source-gap register below.
      </p>

      <div className="eyebrow section-eyebrow">Evidence base summary</div>
      <div className="kpi-grid">
        {evidence.map((e) => (
          <div className="kpi" key={e.l}><div className="kpi-num">{e.n}</div><div className="kpi-label">{e.l}</div></div>
        ))}
      </div>

      <div className="note-line caption">
        Unverified claims are retained for transparency and should not be used in headline conclusions.
      </div>

      <section>
        <div className="eyebrow section-eyebrow">Source-gap register</div>
        <p className="caption" style={{ marginTop: 0 }}>
          Claims not verifiable in the supplied source documents, recorded verbatim from the matrix.
        </p>
        <div className="tbl-wrap">
          <table className="tbl">
            <thead>
              <tr>{SOURCE_GAP_COLS.map((c) => <th key={c}>{c}</th>)}</tr>
            </thead>
            <tbody>
              {[...SOURCE_GAPS].sort((a, b) => (a[SOURCE_GAP_COLS[0]] || "").localeCompare(b[SOURCE_GAP_COLS[0]] || "")).map((g, i) => (
                <tr key={i}>
                  {SOURCE_GAP_COLS.map((c) => <td key={c} className={c === SOURCE_GAP_COLS[0] ? "cell-scheme" : "cell-gap"}>{g[c]}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <div className="eyebrow section-eyebrow">Requirements needing verification</div>
        <p className="caption" style={{ marginTop: 0 }}>
          Every row that is not plainly verified, or that rests on a secondary citation.
        </p>
        <div className="tbl-wrap">
          <table className="tbl">
            <thead>
              <tr><th>Scheme</th><th>Requirement</th><th>Status</th><th>Source signal (indicative)</th><th>Source citation</th></tr>
            </thead>
            <tbody>
              {careRows.map((r) => (
                <tr key={r.id} className={r.status === "Unverified" ? "row-unverified" : ""}>
                  <td className="cell-scheme">{r.scheme}</td>
                  <td className="cell-req">{r.requirement}</td>
                  <td><StatusBadge status={r.status} /></td>
                  <td><SignalBadge signal={r.signal} /></td>
                  <td className="cell-cite">{r.citation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <div className="eyebrow section-eyebrow">Provider confidence overview</div>
        <p className="caption" style={{ marginTop: 0 }}>
          Source confidence is taken directly from the company profiles where stated.
        </p>
        <div className="tbl-wrap">
          <table className="tbl">
            <thead>
              <tr><th>Provider</th><th>Programme</th><th>Confidence (stated)</th><th>Band</th></tr>
            </thead>
            <tbody>
              {[...COMPANIES].sort((a, b) => a["Company"].localeCompare(b["Company"])).map((c) => {
                const cb = confBucket(c["Source confidence"]);
                return (
                  <tr key={c["Company"]}>
                    <td className="cell-scheme">{c["Company"]}</td>
                    <td>{field(c["Programme name"]) || "—"}</td>
                    <td>{field(c["Source confidence"]) || "Not stated"}</td>
                    <td>
                      <span className="badge badge-status">
                        <span className="badge-dot" style={{ background: `var(${cb.varc})` }} />{cb.b}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SHELL                                                              */
/* ------------------------------------------------------------------ */
const TABS = ["Summary", "Requirement Explorer", "Company Deep Dives", "Source Gaps & Evidence"];

export default function App() {
  const [tab, setTab] = useState("Summary");
  const [company, setCompany] = useState(null);

  function pickCompany(name) {
    setCompany(name);
    setTab("Company Deep Dives");
  }

  return (
    <div className="bram">
      <style>{CSS}</style>

      <header className="topbar">
        <div className="container topbar-inner">
          <div className="brand">
            <img
              className="brand-mark-img"
              src="./assets/logos/brandmark-seed-of-life.svg"
              alt=""
              aria-hidden="true"
            />
            <span className="brand-name">Bramble</span>
            <span className="brand-sep">/</span>
            <span className="brand-sub eyebrow">Regenerative Programme Review</span>
          </div>
        </div>
        <nav className="nav" aria-label="Primary">
          <div className="container nav-inner">
            {TABS.map((t) => (
              <button
                key={t}
                className={"nav-item " + (tab === t ? "active" : "")}
                onClick={() => setTab(t)}
                aria-current={tab === t ? "page" : undefined}
              >
                {t}
              </button>
            ))}
          </div>
        </nav>
      </header>

      <main className="container main">
        {tab === "Summary" && <SummaryTab onPickCompany={pickCompany} />}
        {tab === "Requirement Explorer" && <ExplorerTab />}
        {tab === "Company Deep Dives" && <CompanyTab selected={company} setSelected={setCompany} />}
        {tab === "Source Gaps & Evidence" && <SourceTab />}
      </main>

      <footer className="footer container">
        <hr className="rule" />
        <p className="caption">
          Phase 1 requirement-level evidence base. Source-gap leads are retained for transparency
          and should not be used in headline conclusions. Citations preserved verbatim from the matrix.
        </p>
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CSS — Bramble tokens (verbatim from colors_and_type.css) + UI      */
/* ------------------------------------------------------------------ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cabin:wght@400;500;600;700&display=swap');

.bram {
  --bramble-evergreen:#25381c; --bramble-bone:#fbfaf8; --bramble-graphite:#3d3d3b;
  --bramble-mustard:#b3960e; --bramble-claret:#91312d;
  --bramble-amber:#d18730; --bramble-olive:#5e5f41; --bramble-paprika:#c2501d;
  --bramble-midnight:#203147; --bramble-bark:#533017; --bramble-emerald:#0e513e;
  --bg:var(--bramble-bone); --bg-elevated:#ffffff; --bg-tint:#f3eee5; --bg-inverse:var(--bramble-evergreen);
  --fg-1:var(--bramble-graphite); --fg-2:#6b6b67; --fg-3:#9a9a93;
  --fg-inverse:var(--bramble-bone); --fg-display:var(--bramble-evergreen);
  --rule:rgba(61,61,59,0.18); --rule-strong:rgba(61,61,59,0.32); --rule-on-dark:rgba(251,250,248,0.22);
  --status-success:var(--bramble-emerald); --status-warning:var(--bramble-mustard);
  --status-danger:var(--bramble-claret); --status-info:var(--bramble-midnight);
  --font-sans:'Cabin','Gill Sans','Gill Sans MT','Lato',system-ui,sans-serif;
  --track-display:0.2em; --track-eyebrow:0.18em;
  --space-1:4px;--space-2:8px;--space-3:12px;--space-4:16px;--space-5:24px;
  --space-6:32px;--space-7:48px;--space-8:64px;--space-9:96px;
  --container:1240px;
  font-family:var(--font-sans); color:var(--fg-1); background:var(--bg);
  font-weight:400; line-height:1.6; -webkit-font-smoothing:antialiased;
  min-height:100vh;
}
.bram *{box-sizing:border-box;}
.container{max-width:var(--container); margin:0 auto; padding:0 var(--space-6);}

.eyebrow{font-size:12px; letter-spacing:var(--track-eyebrow); text-transform:uppercase;
  font-weight:600; color:var(--fg-2); display:inline-flex; align-items:center; gap:6px;}
.display{font-weight:500; text-transform:uppercase; letter-spacing:var(--track-display);
  color:var(--fg-display); line-height:1.05; margin:0;}
.body-lg{font-size:19px; line-height:1.6;}
.body-sm{font-size:15px; line-height:1.6;}
.caption{font-size:13px; color:var(--fg-2); line-height:1.5;}
.bram h1,.bram h2,.bram h3{margin:0;}
.bram h3{font-weight:600; font-size:20px; color:var(--fg-display); letter-spacing:0;}
.bram p{margin:0 0 var(--space-3); text-wrap:pretty;}
.rule{border:0; border-top:1px solid var(--rule); margin:var(--space-7) 0;}

/* top bar / nav */
.topbar{background:var(--bg); border-bottom:1px solid var(--rule); position:sticky; top:0; z-index:20;}
.topbar-inner{display:flex; align-items:center; padding-top:var(--space-5); padding-bottom:var(--space-4);}
.brand{display:flex; align-items:center; gap:var(--space-3);}
.brand-mark{font-size:18px; color:var(--bramble-evergreen);}
.brand-mark-img{height:26px; width:auto; color:var(--bramble-evergreen); flex:0 0 auto;}
.brand-name{font-weight:600; font-size:18px; color:var(--bramble-evergreen); letter-spacing:0.04em;}
.brand-sep{color:var(--rule-strong);}
.brand-sub{color:var(--fg-2);}

/* per-tab motif illustration, sits to the right of section heading */
.tab-motif{float:right; width:120px; height:auto; margin:0 0 var(--space-4) var(--space-5);
  opacity:0.92; shape-outside:margin-box;}
@media (max-width:720px){ .tab-motif{width:84px;} }

/* Stacked principle bar chart */
.stacked-wrap{margin-top:var(--space-4); max-width:1100px;}
.stacked-legend{display:flex; flex-wrap:wrap; gap:var(--space-5); margin-bottom:var(--space-4);
  font-size:13px; color:var(--fg-1);}
.stacked-legend .legend-item{display:inline-flex; align-items:center; gap:8px;}
.stacked-legend .legend-dot{width:12px; height:12px; display:inline-block;}
.stacked-svg{width:100%; height:auto; display:block;}
.stacked-svg .bar-total{font-family:'Cabin','Gill Sans',sans-serif; font-size:15px; font-weight:600;
  fill:var(--fg-display);}
.stacked-svg .seg-label{font-family:'Cabin','Gill Sans',sans-serif; font-size:13px; font-weight:600;
  fill:#fbfaf8;}
.stacked-svg .bar-xlabel{font-family:'Cabin','Gill Sans',sans-serif; font-size:13px;
  fill:var(--fg-1);}

/* Five broader asks — accordion list */
.five-asks{margin-top:var(--space-6);}
.ask-list{list-style:none; padding:0; margin:var(--space-5) 0 0;
  border-top:1px solid var(--rule);}
.ask-item{border-bottom:1px solid var(--rule); background:var(--bg);}
.ask-item.is-open{background:var(--bg-elevated);}
.ask-head{display:grid; grid-template-columns:auto 1fr auto; gap:var(--space-4);
  align-items:start; width:100%; padding:var(--space-5) var(--space-4);
  background:none; border:0; cursor:pointer; text-align:left;
  font-family:inherit; color:var(--fg-display);}
.ask-head:hover{background:var(--bg-tint);}
.ask-head:focus-visible{outline:2px solid var(--bramble-evergreen); outline-offset:-2px;}
.ask-n{font-family:'Cabin','Gill Sans',sans-serif; font-weight:600;
  font-size:22px; color:var(--bramble-evergreen); line-height:1;
  min-width:28px; padding-top:2px; font-variant-numeric:tabular-nums;}
.ask-title{font-size:17px; font-weight:600; line-height:1.35; color:var(--fg-display);
  padding-top:1px;}
.ask-caret{color:var(--bramble-evergreen); transition:transform 0.2s ease;
  margin-top:4px; flex:0 0 auto;}
.ask-body{padding:0 var(--space-4) var(--space-6) calc(28px + var(--space-4) + var(--space-4));
  display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1fr); gap:var(--space-7);}
.ask-section .eyebrow{margin-bottom:var(--space-2);}
.ask-text{margin:0; max-width:520px; font-size:15px; line-height:1.5; color:var(--fg-1);}
.ask-evidence{margin:0; padding-left:var(--space-4); font-size:14px; line-height:1.55; color:var(--fg-1);}
.ask-evidence li{margin-bottom:var(--space-1);}
@media (max-width:820px){
  .ask-body{grid-template-columns:1fr; gap:var(--space-5);
    padding-left:calc(28px + var(--space-4) + var(--space-4));}
}
.nav-inner{display:flex; gap:var(--space-6);}
.nav-item{background:none; border:0; border-bottom:2px solid transparent; cursor:pointer;
  font-family:inherit; font-size:12px; letter-spacing:0.14em; text-transform:uppercase;
  font-weight:600; color:var(--fg-2); padding:var(--space-3) 0 var(--space-4); transition:color .2s, border-color .2s;}
.nav-item:hover{color:var(--bramble-evergreen);}
.nav-item.active{color:var(--bramble-evergreen); border-bottom-color:var(--bramble-evergreen);}
.nav-item:focus-visible{outline:2px solid var(--bramble-mustard); outline-offset:3px;}

.main{padding-top:var(--space-7); padding-bottom:var(--space-9); min-height:60vh;}
.footer{padding-bottom:var(--space-7);}

/* hero */
.hero{max-width:860px;}
.hero-title{font-size:clamp(40px,6vw,68px); margin:var(--space-3) 0 var(--space-4);}
.hero-sub{color:var(--fg-1); max-width:720px;}
.hero-note{margin-top:var(--space-5); padding:var(--space-4) var(--space-5);
  border-left:2px solid var(--bramble-mustard); background:var(--bg-tint);}

.section-eyebrow{display:block; margin:var(--space-7) 0 var(--space-4);}

/* KPI */
.kpi-grid{display:grid; grid-template-columns:repeat(6,1fr); gap:0; border:1px solid var(--rule);}
.kpi{padding:var(--space-5); border-right:1px solid var(--rule); background:var(--bg-elevated);}
.kpi:last-child{border-right:0;}
.kpi-num{font-size:40px; font-weight:500; color:var(--bramble-evergreen); line-height:1; letter-spacing:-0.01em;}
.kpi-num.kpi-text{font-size:17px; font-weight:600; line-height:1.2;}
.kpi-label{font-size:12px; color:var(--fg-2); text-transform:uppercase; letter-spacing:0.1em; margin-top:var(--space-3);}
.company-kpi{grid-template-columns:repeat(6,1fr);}

/* two column */
.two-col{display:grid; grid-template-columns:1fr 1fr; gap:var(--space-7); align-items:start;}
.two-col > section{min-width:0;}

/* bars */
.bars{display:flex; flex-direction:column; gap:var(--space-3);}
.bar-row{display:grid; grid-template-columns:170px 1fr 34px; align-items:center; gap:var(--space-4);}
.bar-label{color:var(--fg-1); text-align:right; line-height:1.25;}
.bar-track{height:14px; background:var(--bg-tint); border:1px solid var(--rule);}
.bar-fill{height:100%;}
.bar-val{font-size:14px; color:var(--fg-2); font-variant-numeric:tabular-nums; text-align:left;}

/* status strip */
.statusbar{display:flex; height:22px; border:1px solid var(--rule); overflow:hidden;}
.statusbar-seg{height:100%;}
.statusbar-legend{display:flex; flex-wrap:wrap; gap:var(--space-5); margin-top:var(--space-3);}
.legend-item{display:inline-flex; align-items:center; gap:6px;}

/* heatmap */
.heat-wrap{overflow-x:auto; border:1px solid var(--rule);}
.heat{border-collapse:collapse; width:100%; font-size:13px;}
.heat th, .heat td{border:1px solid var(--rule); text-align:center;}
.heat-corner{background:var(--bg-tint);}
.heat-col{background:var(--bg-tint); padding:var(--space-3) var(--space-2); vertical-align:bottom; max-width:96px;}
.heat-col span{font-weight:600; text-transform:uppercase; letter-spacing:0.06em; font-size:10px;
  line-height:1.3; color:var(--fg-display); display:block; text-align:center; word-break:normal; overflow-wrap:break-word;}
.heat-rowlab{background:var(--bg-tint); text-align:left; padding:var(--space-3) var(--space-4); font-weight:600;
  white-space:nowrap; cursor:pointer; color:var(--fg-display);}
.heat-rowlab:hover{color:var(--bramble-claret); text-decoration:underline;}
.heat-cell{padding:var(--space-3); font-variant-numeric:tabular-nums; min-width:42px;}

/* insights */
.insights{margin:0; padding:0; list-style:none; display:flex; flex-direction:column; gap:var(--space-4);}
.insights li{padding-left:var(--space-5); position:relative; max-width:880px; font-size:16px;}
.insights li:before{content:"▸"; position:absolute; left:0; color:var(--bramble-mustard);}
.discipline{margin-top:var(--space-7); padding:var(--space-6); background:var(--bg-tint); border:1px solid var(--rule);}
.discipline p{max-width:880px; margin:0;}

/* explorer */
.explorer{display:grid; grid-template-columns:260px 1fr; gap:var(--space-6); align-items:start; margin-top:var(--space-4);}
.filters{border:1px solid var(--rule); background:var(--bg-elevated); padding:var(--space-5);
  position:sticky; top:120px;}
.filters-head{display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-4);}
.link-btn{background:none; border:0; color:var(--bramble-claret); font-family:inherit; font-size:13px; cursor:pointer; padding:0;}
.link-btn:hover{text-decoration:underline;}
.searchbox{display:flex; align-items:center; gap:var(--space-2); border:1px solid var(--rule); padding:var(--space-2) var(--space-3);
  background:var(--bg); margin-bottom:var(--space-5); color:var(--fg-2);}
.searchbox input{border:0; background:none; outline:none; font-family:inherit; font-size:14px; width:100%; color:var(--fg-1);}
.filter-group{margin-bottom:var(--space-4); display:flex; flex-direction:column; gap:var(--space-2);}
.select-wrap{position:relative;}
.select-wrap select{width:100%; appearance:none; border:1px solid var(--rule); background:var(--bg);
  font-family:inherit; font-size:14px; padding:var(--space-2) var(--space-5) var(--space-2) var(--space-3); color:var(--fg-1); cursor:pointer; border-radius:2px;}
.select-caret{position:absolute; right:8px; top:50%; transform:translateY(-50%) rotate(90deg); color:var(--fg-2); pointer-events:none;}
.select-wrap select:focus-visible{outline:2px solid var(--bramble-mustard); outline-offset:1px;}

.results{min-width:0;}
.results-bar{display:flex; align-items:center; gap:var(--space-4); margin-bottom:var(--space-4); flex-wrap:wrap;}
.rowcount{font-size:13px; color:var(--fg-2); text-transform:uppercase; letter-spacing:0.08em; font-weight:600; white-space:nowrap;}
.chips{display:flex; gap:var(--space-2); flex-wrap:wrap;}
.chip{display:inline-flex; align-items:center; gap:6px; border:1px solid var(--rule-strong); background:var(--bg);
  font-family:inherit; font-size:12px; padding:4px 10px; border-radius:999px; cursor:pointer; color:var(--fg-1);}
.chip:hover{border-color:var(--bramble-claret); color:var(--bramble-claret);}

/* tables */
.tbl-wrap{border:1px solid var(--rule); overflow-x:auto; background:var(--bg-elevated);}
.tbl{border-collapse:collapse; width:100%; font-size:14px;}
.tbl thead th{text-align:left; font-size:11px; text-transform:uppercase; letter-spacing:0.1em; font-weight:600;
  color:var(--fg-2); padding:var(--space-3) var(--space-4); border-bottom:1px solid var(--rule-strong);
  background:var(--bg-tint); white-space:nowrap; vertical-align:bottom;}
.tbl th.sortable{cursor:pointer; user-select:none;}
.tbl th.sortable span{margin-right:4px;}
.tbl th.sortable svg{vertical-align:middle; opacity:.45;}
.tbl th.sortable.active{color:var(--bramble-evergreen);} .tbl th.sortable.active svg{opacity:1;}
.tbl td{padding:var(--space-3) var(--space-4); border-bottom:1px solid var(--rule); vertical-align:top; line-height:1.45;}
.tbl tbody tr:last-child td{border-bottom:0;}
.row{cursor:pointer; transition:background .15s;}
.row:hover{background:var(--bg-tint);}
.row:focus-visible{outline:2px solid var(--bramble-mustard); outline-offset:-2px;}
.row-unverified{box-shadow:inset 3px 0 0 var(--bramble-claret);}
.row-unverified td:first-child{padding-left:calc(var(--space-4) + 3px);}
.cell-scheme{font-weight:600; color:var(--fg-display); white-space:nowrap;}
.cell-req{max-width:340px;}
.cell-cite{max-width:230px; font-size:13px; color:var(--fg-2);}
.cell-mot{font-size:13px; color:var(--fg-2); max-width:150px;}
.cell-gap{font-size:13px; max-width:260px;}
.tbl.compact td, .tbl.compact th{font-size:13px;}
.empty-row{text-align:center; color:var(--fg-2); padding:var(--space-7)!important;}

/* badges */
.badge{display:inline-flex; align-items:center; gap:6px; font-size:12px; font-weight:500; white-space:nowrap;}
.badge-dot{width:8px; height:8px; border-radius:999px; flex:none;}
.badge-status{border:1px solid var(--rule); padding:3px 9px; border-radius:999px; background:var(--bg);}
.badge-signal{padding:3px 9px; border-radius:999px; font-size:11px;}
.sig-primary{border:1px solid var(--bramble-evergreen); color:var(--bramble-evergreen);}
.sig-secondary{border:1px solid var(--bramble-olive); color:var(--bramble-olive); background:rgba(94,95,65,0.06);}

/* caution */
.caution{display:flex; gap:var(--space-3); align-items:flex-start; padding:var(--space-3) var(--space-4); font-size:14px; line-height:1.5;}
.caution svg{flex:none; margin-top:2px;}
.caution-danger{border:1px solid var(--bramble-claret); background:rgba(145,49,45,0.06); color:var(--bramble-claret);}
.caution-warn{border:1px solid var(--bramble-mustard); background:rgba(179,150,14,0.08); color:var(--bramble-bark);}

/* field rows */
.frow{display:grid; grid-template-columns:200px 1fr; gap:var(--space-4); padding:var(--space-3) 0; border-bottom:1px solid var(--rule);}
.frow:last-child{border-bottom:0;}
.frow-label{padding-top:2px;}
.frow-value{font-size:15px; line-height:1.55; color:var(--fg-1);}
.frow-empty{color:var(--fg-3); font-style:italic;}
.panel{border:1px solid var(--rule); background:var(--bg-elevated); padding:var(--space-6); margin-top:var(--space-4);}
.panel .section-eyebrow:first-child{margin-top:0;}

/* company grid */
.company-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:var(--space-5); margin-top:var(--space-4);}
.company-card{text-align:left; border:1px solid var(--rule); background:var(--bg-elevated); padding:var(--space-5);
  cursor:pointer; font-family:inherit; transition:border-color .2s, background .2s; display:flex; flex-direction:column; gap:var(--space-2);}
.company-card:hover{border-color:var(--bramble-evergreen); background:var(--bg-tint);}
.company-card:focus-visible{outline:2px solid var(--bramble-mustard); outline-offset:2px;}
.company-card-name{font-size:18px; font-weight:600; color:var(--fg-display);}
.company-card-foot{display:flex; justify-content:space-between; align-items:center; margin-top:auto; padding-top:var(--space-3); color:var(--fg-2);}
.back-btn{display:inline-flex; align-items:center; gap:6px; background:none; border:0; font-family:inherit; cursor:pointer;
  color:var(--bramble-claret); font-size:12px; text-transform:uppercase; letter-spacing:0.12em; font-weight:600; padding:0; margin-bottom:var(--space-5);}
.back-btn:hover{text-decoration:underline;}
.company-head{margin-bottom:var(--space-6);}
.company-title{font-size:clamp(32px,4.5vw,52px); margin-top:var(--space-2);}
.gap-panel{margin-top:var(--space-7);}
.gap-entry{border-top:1px solid var(--rule); padding:var(--space-3) 0;}
.gap-claim{font-size:14px; font-weight:500; margin-bottom:4px;}
.gap-meta{display:flex; flex-direction:column; gap:2px;}

.note-line{margin-top:var(--space-4); padding:var(--space-3) var(--space-4); border-left:2px solid var(--bramble-claret); background:var(--bg-tint);}

/* drawer */
.drawer-overlay{position:fixed; inset:0; background:rgba(37,56,28,0.28); z-index:50; display:flex; justify-content:flex-end;}
.drawer{width:min(520px,92vw); height:100%; background:var(--bg); border-left:1px solid var(--rule-strong);
  padding:var(--space-6); overflow-y:auto; box-shadow:var(--shadow-2,0 4px 16px -8px rgba(37,56,28,0.12));}
.drawer-head{display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-4);}
.drawer-title{font-size:22px; line-height:1.3; color:var(--fg-display); margin-bottom:var(--space-4); font-weight:600;}
.drawer-badges{display:flex; gap:var(--space-3); flex-wrap:wrap; margin-bottom:var(--space-4);}
.icon-btn{background:none; border:0; cursor:pointer; color:var(--bramble-graphite); padding:4px; display:inline-flex; line-height:0;}
.icon-btn:hover{color:var(--bramble-claret);}
.icon-btn:focus-visible{outline:2px solid var(--bramble-mustard); outline-offset:2px;}

@media (max-width:980px){
  .kpi-grid,.company-kpi{grid-template-columns:repeat(3,1fr);}
  .kpi:nth-child(3n){border-right:0;}
  .kpi{border-bottom:1px solid var(--rule);}
  .two-col{grid-template-columns:1fr;}
  .explorer{grid-template-columns:1fr;}
  .filters{position:static;}
  .company-grid{grid-template-columns:1fr 1fr;}
}
@media (max-width:620px){
  .kpi-grid,.company-kpi{grid-template-columns:1fr 1fr;}
  .kpi:nth-child(3n){border-right:1px solid var(--rule);}
  .kpi:nth-child(2n){border-right:0;}
  .company-grid{grid-template-columns:1fr;}
  .nav-inner{overflow-x:auto;}
  .bar-row{grid-template-columns:120px 1fr 30px;}
}
@media (prefers-reduced-motion:reduce){ .bram *{transition:none!important;} }
`;

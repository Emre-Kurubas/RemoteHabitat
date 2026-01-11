/**
 * Remote Habitat - FCC Data Processing Script
 * 
 * Parses real FCC Broadband data files and combines with rural designation data.
 * 
 * Required files in csv_files/:
 * - bdc_us_fixed_broadband_summary_by_geography_*.csv (broadband coverage by county)
 * - bdc_us_provider_summary_by_geography_*.csv (top providers by area)
 * - cfpb_rural-underserved-list_*.csv (rural county designations)
 * 
 * Usage:
 *   node scripts/seed-data.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// State FIPS to name mapping
const STATE_FIPS = {
    '01': 'Alabama', '02': 'Alaska', '04': 'Arizona', '05': 'Arkansas', '06': 'California',
    '08': 'Colorado', '09': 'Connecticut', '10': 'Delaware', '11': 'District of Columbia',
    '12': 'Florida', '13': 'Georgia', '15': 'Hawaii', '16': 'Idaho', '17': 'Illinois',
    '18': 'Indiana', '19': 'Iowa', '20': 'Kansas', '21': 'Kentucky', '22': 'Louisiana',
    '23': 'Maine', '24': 'Maryland', '25': 'Massachusetts', '26': 'Michigan', '27': 'Minnesota',
    '28': 'Mississippi', '29': 'Missouri', '30': 'Montana', '31': 'Nebraska', '32': 'Nevada',
    '33': 'New Hampshire', '34': 'New Jersey', '35': 'New Mexico', '36': 'New York',
    '37': 'North Carolina', '38': 'North Dakota', '39': 'Ohio', '40': 'Oklahoma', '41': 'Oregon',
    '42': 'Pennsylvania', '44': 'Rhode Island', '45': 'South Carolina', '46': 'South Dakota',
    '47': 'Tennessee', '48': 'Texas', '49': 'Utah', '50': 'Vermont', '51': 'Virginia',
    '53': 'Washington', '54': 'West Virginia', '55': 'Wisconsin', '56': 'Wyoming',
    '72': 'Puerto Rico'
};

// Cost of Living Index by state (approximate, can be updated with better data)
const STATE_COL_INDEX = {
    'Alabama': 89, 'Alaska': 127, 'Arizona': 103, 'Arkansas': 89, 'California': 142,
    'Colorado': 105, 'Connecticut': 111, 'Delaware': 101, 'District of Columbia': 125,
    'Florida': 101, 'Georgia': 93, 'Hawaii': 192, 'Idaho': 97, 'Illinois': 94,
    'Indiana': 91, 'Iowa': 90, 'Kansas': 89, 'Kentucky': 90, 'Louisiana': 92,
    'Maine': 99, 'Maryland': 113, 'Massachusetts': 131, 'Michigan': 90, 'Minnesota': 98,
    'Mississippi': 84, 'Missouri': 89, 'Montana': 95, 'Nebraska': 92, 'Nevada': 104,
    'New Hampshire': 106, 'New Jersey': 115, 'New Mexico': 91, 'New York': 123,
    'North Carolina': 96, 'North Dakota': 96, 'Ohio': 90, 'Oklahoma': 87, 'Oregon': 113,
    'Pennsylvania': 96, 'Rhode Island': 99, 'South Carolina': 95, 'South Dakota': 95,
    'Tennessee': 91, 'Texas': 92, 'Utah': 97, 'Vermont': 104, 'Virginia': 104,
    'Washington': 110, 'West Virginia': 88, 'Wisconsin': 93, 'Wyoming': 93,
    'Puerto Rico': 85
};

/**
 * Create URL-safe slug
 */
function createSlug(str) {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

/**
 * Parse CSV line handling quoted fields
 */
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current.trim());
    return result;
}

/**
 * Load rural counties from CFPB list
 */
async function loadRuralCounties(filePath) {
    const ruralFips = new Set();

    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

    let isFirst = true;
    for await (const line of rl) {
        if (isFirst) { isFirst = false; continue; }
        const parts = parseCSVLine(line);
        if (parts[0]) {
            ruralFips.add(parts[0].padStart(5, '0'));
        }
    }

    console.log(`✅ Loaded ${ruralFips.size} rural counties from CFPB list`);
    return ruralFips;
}

// Common provider ID to name mapping (from FCC provider list)
const PROVIDER_NAMES = {
    '130077': 'Charter Communications',
    '130228': 'Lumen Technologies',
    '130403': 'AT&T',
    '130747': 'Comcast',
    '131425': 'Cox Communications',
    '131455': 'Frontier Communications',
    '131531': 'Verizon',
    '130008': 'TDS Telecom',
    '130004': 'Windstream',
    '131472': 'Altice USA',
    '130103': 'Mediacom',
    '131197': 'Cable One',
    '130127': 'Consolidated Communications',
    '130148': 'Cincinnati Bell',
    '130293': 'Atlantic Broadband',
    '130005': 'CenturyLink',
    '131083': 'Sparklight',
    '130002': 'Brightspeed',
    '130001': 'Ziply Fiber',
    '131527': 'Spectrum',
    '130627': 'Hughes Network Systems',
    '290111': 'Viasat',
    '430076': 'Starlink',
    '390122': 'Tombigbee Fiber',
    '390052': 'Pine Belt Communications',
    '390040': 'Mon-Cre Telephone',
    '260052': 'TW Telecom',
    '131310': 'TDS Telecom',
    '190123': 'Direct Management Company',
    '130498': 'Windstream',
    '130485': 'Frontier Cables',
    '131395': 'United Wireless',
    '131141': 'Rural Telephone Svc',
    '420187': 'Golden West Telecom',
    '130317': 'Comcast',
    '130235': 'Charter Communications',
    '130370': 'Altice USA',
    '130534': 'GCI',
    '130982': 'New Hope Telephone Cooperative',
    '131386': 'Evertek Enterprises',
    '130258': 'Frontier Communications',
    '460677': 'Major Mobile Provider', // Widespread mobile coverage, likely Dish/Genesis or similar
    '360117': 'Fusion Connect',
    '130228': 'Lumen',
    '470022': 'Brightspeed',
    '130079': 'Astound Broadband',
    '130360': 'Cox Communications',
    '130452': 'Google Fiber',
    '130006': 'US Cellular',
    '131413': 'Windstream',
    '130623': 'Hotwire Communications',
    '130183': 'Cable One',
    '310015': 'Callabyte Technology',
    '130335': 'Consolidated Communications',
    '131081': 'Metronet',
    '130804': 'Mediacom',
    '360061': 'One Ring Networks',
    '290010': 'Nextlink Internet',
    '410114': 'Vyve Broadband',
    '280001': 'Breezeline',
    '130081': 'Viya',
    '130254': 'Cincinnati Bell', // or Altafiber
    '370032': 'Delta Telecom',
    '130133': 'Blanchard Telephone',
    '230043': 'Southeast Nebraska Communications',
    '300171': 'Visionary Broadband',
    '310024': 'Brainstorm Internet',
    '130453': 'Emery Telcom',
    '380072': 'All West Communications',
    '170054': 'Fiber is Fast',
    '131387': 'Ultimate Internet Access',
    '131219': 'South Central Utah Telephone',
    '270027': 'Wtechlink',
    '131497': 'Intermax Networks',
    '420173': 'Ziply Fiber', // Widespread PNW ID
    '190303': 'LocalTel Communications',
    '470055': 'NCI Datacom',
    '340029': 'Midco', // Midcontinent Communications
    '130132': 'Blackfoot Communications',
    '131102': 'Nemont',
    '130826': 'Black Hills Energy', // or similar local fiber/broadband arm
    '440186': 'Direct Management Company',
    '130032': 'Albion Telephone Company',
    '130036': 'All West Communications',
    '320127': 'White Cloud Communications', // Common in Twin Falls/Idaho Falls
    '310036': 'EL Internet Northwest', // Common in Sandpoint/North ID
    '130831': 'Midvale Telephone Exchange',
    '131190': 'Horizon Communications',
    '170071': 'Ptera', // Common fixed wireless in Spokane/North ID
    '430175': 'First Step Internet', // Moscow/Bovill ID area
    '140048': 'Project Mutual Telephone', // Burley ID "PMT"
    '390006': 'AirBridge Broadband', // Craigmont ID
    '130964': 'Nushagak Electric & Telephone Cooperative', // Dillingham AK
    '130791': 'GCI Communication Corp', // Major Alaska provider
    '260068': 'GCI Communication Corp', // Likely another GCI ID (cable/fiber/wireless)
    '290093': 'Xfinity', // Comcast/Xfinity appears to be mapping to this in WA/OR/WV
    '370088': 'Spectrum', // Charter/Spectrum mapping for WA/OR
    '380048': 'Consolidated Smart Systems', // Ellensburg WA
    '140084': 'Alaska Communications', // Fairbanks AK
    '130349': 'Community Telephone Co',
    '130160': 'Bristol Tennessee Essential Services',
    '190281': 'Ozarks Electric Cooperative',
    '130029': 'Albany Mutual Telephone',
    '131208': 'FastTrack Communications', // Durango CO
    '131016': 'PCC Holdings', // Decatur IN / Deming NM (Plateau Telecommunications?)
    '131038': 'Pine Belt Communications', // Selma AL
    '130067': 'Arkansas Telephone Company', // Little Rock / Clinton AR
    '390106': 'Aristotle Unified Communications', // Little Rock / Conway
    '450100': 'Yelcot Telephone Company', // Big Flat / Mountain Home AR
    '131518': 'Ritter Communications', // Northeast Arkansas
    '450169': 'RightFiber', // Brand of Ritter Communications (Russellville AR)
    '350110': 'Velocity Telephone',
    '270020': 'Calaveras Telephone Company (CalTel)',
    '350030': 'DigitalPath', // Fixed wireless in Bangor/Chico CA
    '131207': 'SmarterBroadband', // Common in Alta Sierra/Grass Valley CA
    '340041': 'Velocity Communications', // Fixed wireless in Anderson/Redding CA
    '370162': 'Ciello', // San Luis Valley/Creede CO fiber
    '360114': 'Union Telephone Company', // "Union Wireless" - WY/CO/UT
    '440029': 'Luminate Broadband', // Craig/Yampa Valley CO
    '460089': 'Visionary Broadband', // (Alternate ID used in CO/NM)
    '130663': 'Rise Broadband', // Major fixed wireless in CO/Midwest
    '131362': 'Mercury Broadband', // Kansas/Midwest fixed wireless
    '190311': 'Cruzio Internet', // Santa Cruz/Aptos CA

    // === Newly discovered provider mappings (January 2026) ===
    // Puerto Rico
    '170001': 'América Móvil', // Major Puerto Rico provider (73 counties)

    // Mississippi
    '131302': 'MaxxSouth Broadband', // Mississippi cable provider (31 counties)

    // Missouri
    '450172': 'Mid-Missouri Telephone Company', // Central Missouri (19 counties)
    '130781': 'Mark Twain Rural Telephone Company', // Northeast Missouri (6 counties)

    // South Dakota
    '130550': 'Golden West Telecommunications', // Western SD (9 counties)

    // Montana
    '131367': 'Triangle Communications', // Central/Eastern Montana (9 counties)
    '130890': 'Nemont Telephone Cooperative', // Northeast Montana (4 counties)

    // Nevada
    '320117': 'CC Communications', // Rural Nevada (9 counties)

    // Virginia
    '340070': 'BARC Electric Cooperative', // Southwest Virginia (8 counties)

    // Minnesota/Dakotas
    '130821': 'Midco', // MN/ND/SD (7 counties, alternate ID)

    // North Carolina
    '130926': 'SkyBest Communications', // NW North Carolina (7 counties)

    // California
    '460087': 'Sebastian Fiber', // Central California (7 counties)

    // Montana/Wyoming
    '131090': 'Range Telephone Cooperative', // MT/WY (6 counties)

    // Idaho
    '360134': 'Direct Communications', // Southeast Idaho (6 counties)

    // Kansas
    '460631': 'Nextlink Internet', // Kansas fixed wireless (5 counties)
    '131145': 'Wes-Tex Telephone Cooperative', // Western Kansas (5 counties)

    // North Dakota
    '130337': 'Consolidated Telcom', // Western ND (5 counties)

    // Tennessee
    '131384': 'Twin Lakes Telephone Cooperative', // Upper Cumberland TN (5 counties)
    '410067': 'Tennessee Telephone Company', // Western TN (5 counties)

    // Texas
    '130199': 'Cap Rock Telephone Cooperative', // West Texas (5 counties)
    '130123': 'Big Bend Telephone Company', // Far West Texas (5 counties)
    '131162': 'Santa Rosa Telephone Cooperative', // North Texas (4 counties)
    '131055': 'Poka Lambro Telephone Cooperative', // West Texas (3 counties)
    '340059': 'XIT Communications', // Texas Panhandle (4 counties)
    '340001': 'Valley Telephone Cooperative', // South Texas (3 counties)

    // Nebraska
    '131211': 'Consolidated Companies', // Sandhills Nebraska (5 counties)
    '131340': 'Nebraska Central Telephone', // Central Nebraska (2 counties)

    // Wisconsin
    '300025': 'CenturyTel of Wisconsin', // Northern Wisconsin (5 counties)
    '130937': 'Langlade County Telephone', // Northeast Wisconsin (4 counties)

    // Kentucky
    '131328': 'Thacker-Grigsby Telephone', // Eastern Kentucky (9 counties)
    '130865': 'Peoples Rural Telephone Cooperative', // Eastern Kentucky (4 counties)
    '130507': 'Appalachian Wireless', // Eastern Kentucky (3 counties)
    '131029': 'Jackson Energy Cooperative', // Eastern Kentucky (2 counties)
    '130423': 'Duo County Telephone', // South-Central Kentucky (2 counties)

    // Oklahoma
    '131039': 'Pine Telephone Company', // Southeast Oklahoma (4 counties)
    '190233': 'Southwest Oklahoma Telephone', // Southwest Oklahoma (4 counties)
    '131007': 'PTCI Panhandle Telephone', // Oklahoma Panhandle (3 counties)

    // South Carolina
    '130490': 'FTC Communications', // Central SC (4 counties)
    '131459': 'Palmetto Rural Telephone', // Western SC (2 counties)

    // Vermont
    '460632': 'Consolidated Communications', // Vermont (10 counties)

    // West Virginia
    '131181': 'Shenandoah Telephone', // VA/WV border (4 counties)
    '130588': 'Hardy Telecommunications', // Eastern WV (2 counties)
    '130071': 'Armstrong Telephone Company', // PA/WV (3 counties)

    // Georgia
    '131485': 'Trenton Telephone Company', // Eastern Georgia (3 counties)

    // New Mexico
    '130458': 'Plateau Telecommunications', // Southeast NM (3 counties)
    '320055': 'Cyber Mesa Computer Systems', // Central NM (3 counties)

    // Utah/New Mexico
    '160127': 'All West Communications', // UT/NM (4 counties, alternate ID)

    // Iowa/Missouri
    '130560': 'Grand River Mutual Telephone', // IA/MO border (2 counties)
    '130259': 'Heart of Iowa Communications', // Central Iowa (1 county)

    // Michigan
    '130018': 'Agri-Valley Communications', // Thumb region Michigan (2 counties)

    // Minnesota/NC
    '160157': 'CTC Telecom', // MN/NC (3 counties)

    // === Second batch of provider mappings (January 2026) ===
    // Missouri
    '260056': 'CenturyLink', // Southwest Missouri (7 counties)

    // Mississippi
    '440004': '4-County Fiber (FASTnet)', // Northeast MS (3 counties)

    // South Dakota
    '131422': 'Venture Communications Cooperative', // Central SD (3 counties)
    '130243': 'West River Cooperative Telephone', // West SD (2 counties)

    // Tennessee/Virginia
    '131170': 'Scott County Telephone Cooperative', // TN/VA border (3 counties)
    '130396': 'DTC Communications', // Middle TN (2 counties)
    '130112': 'Ben Lomand Rural Telephone', // Upper Cumberland TN (2 counties)
    '131611': 'Highland Telephone Cooperative', // KY/TN border (3 counties)

    // North Dakota
    '130405': 'Dickey Rural Networks', // SE North Dakota (2 counties)
    '130950': 'Northwest Communications Cooperative', // NW North Dakota (2 counties)
    '130108': 'Believe Wireless', // Central ND (2 counties)
    '131465': 'West River Telecommunications (WRT)', // SW North Dakota (2 counties)

    // Texas
    '130825': 'Mid-Plains Rural Telephone Cooperative', // Texas Panhandle (2 counties)
    '130227': 'Central Texas Telephone Cooperative', // Hill Country TX (2 counties)
    '130400': 'Trans-Pecos Telephone', // Far West Texas (2 counties)
    '310096': 'Big Country Telecom', // Central Texas (2 counties)
    '320114': 'Victoria Electric Cooperative', // Coastal Texas (2 counties)

    // Nebraska
    '131349': 'Titonka Telephone Company', // North-Central NE (2 counties)
    '130886': 'Nebraska Technology & Telecom', // Central NE (2 counties)
    '130065': 'Arapahoe Telephone Company', // Southwest NE (2 counties)
    '130569': 'Mobius Communications', // Northwest NE (2 counties)

    // Wyoming
    '131366': 'TCT West', // Northwest WY (2 counties, Big Horn/Park)
    '220073': 'Silver Star Communications', // SE/Central WY (2 counties)

    // Kentucky/Tennessee
    '130929': 'North Central Telephone Cooperative', // KY/TN border (2 counties)

    // Michigan
    '130607': 'Hiawatha Telephone Company', // Upper Peninsula MI (2 counties)

    // Maine
    '430222': 'Pioneer Wireless', // Eastern Maine (2 counties)

    // North Carolina/South Carolina
    '131125': 'Comporium', // NC/SC border (2 counties)

    // Puerto Rico
    '450162': 'Liberty Puerto Rico', // Central PR (2 counties)
    '460604': 'Claro Puerto Rico', // Western PR (2 counties)

    // Nevada
    '360094': 'Nevada Wireless', // Rural Nevada (2 counties)

    // Montana
    '240109': 'Three Rivers Communications', // Western Montana (2 counties)

    // North Carolina/Virginia
    '131486': 'Lumen Technologies', // NC/VA (2 counties)

    // Oregon
    '270011': 'DirectLink', // Willamette Valley OR (2 counties)

    // Wisconsin
    '260003': 'Lakefield Telephone Company', // Eastern WI (2 counties)

    // === Third batch of provider mappings (January 2026 comprehensive) ===
    // Maryland
    '290018': 'Bloosurf', // Eastern Shore MD (2 counties)

    // Georgia
    '130044': 'Alma Telecom', // Bacon County GA
    '131041': 'Pineland Telephone Cooperative', // Candler County GA
    '150258': 'Ellijay Telephone Company', // Gilmer County GA
    '131365': 'TEC (Telephone Electronics Corporation)', // Dade County GA
    '130391': 'Darien Telephone Company', // McIntosh County GA

    // Oklahoma
    '360065': 'OzarksGo', // NE Oklahoma (Adair County)

    // Iowa
    '130878': 'Louisa Communications', // Louisa County IA

    // Kentucky
    '190182': 'Harlan Municipal Utilities', // Harlan County KY
    '131216': 'South Central Communications', // Metcalfe County KY
    '130094': 'Ballard Rural Telephone', // Ballard County KY
    '130150': 'Brandenburg Telephone Company', // Meade County KY

    // Michigan
    '130095': 'BARC Electric Cooperative', // Baraga County MI
    '410139': 'Cherry Capital Connection', // Benzie County MI
    '440167': 'Alpena Wireless', // Alpena County MI

    // Minnesota
    '131482': 'Wikstrom Telephone Company', // Kittson County MN
    '130526': 'Garden Valley Telephone Company', // Red Lake County MN
    '131014': 'Paul Bunyan Communications', // Beltrami County MN
    '310094': 'Arthur Mutual Telephone', // Cook County MN

    // Missouri
    '130940': 'NEMR Telecom', // Putnam County MO
    '130124': 'Chariton Valley Telecom', // Madison County MO

    // Nebraska
    '130114': 'BW Telcom', // Dundy County NE
    '131226': 'Springview Telephone Company', // Rock County NE
    '150250': 'Jefferson Telecom', // Jefferson County NE

    // New Mexico
    '390061': 'La Jicarita Rural Telephone', // Taos County NM
    '130708': 'Penasco Valley Telephone', // Mora County NM

    // North Carolina
    '131199': 'SkyLine Membership Corporation', // Ashe County NC
    '131516': 'Yadkin Valley Telecom', // Davie County NC
    '380045': 'French Broad Electric', // Madison County NC

    // North Dakota
    '130885': 'North Dakota Telephone Company (NDTC)', // Benson County ND
    '130387': 'Dakota Central Telecommunications', // Stutsman County ND
    '300188': 'Standing Rock Telecom', // Sioux County ND

    // Ohio
    '170047': 'Frontier Communications (Ohio)', // Monroe County OH

    // South Dakota
    '130828': 'Farmers Mutual Telephone (MN)', // Brule County SD
    '131409': 'Valley Telephone Cooperative (SD)', // Campbell County SD

    // Tennessee
    '130136': 'Bledsoe Telephone Cooperative (BTC Fiber)', // Bledsoe County TN
    '390044': 'Gibson Connect', // Lake County TN
    '190015': 'Chester Telephone Company', // Chester County TN
    '400100': 'Volunteer Wireless', // Cocke County TN
    '420028': 'Peoples Telephone Company', // Stewart County TN
    '390124': 'United Communications', // Trousdale County TN
    '360029': 'Uniti Fiber', // Unicoi County TN

    // Texas
    '130502': 'Five Area Telephone Cooperative', // Bailey County TX
    '130307': 'Coleman County Telephone Cooperative', // Coleman County TX
    '450052': 'DeWitt Telephone Company', // DeWitt County TX
    '440203': 'XIT Communications', // Oldham County TX (alternate ID)
    '130612': 'Hill Country Telephone Cooperative', // Real County TX
    '360006': 'Gvtc Communications', // Bandera County TX

    // West Virginia
    '190435': 'Citynet', // Doddridge County WV
    '131245': 'Spruce Knob Seneca Rocks Telephone', // Pendleton County WV

    // Alaska
    '130275': 'Ketchikan Public Utilities', // Ketchikan Gateway Borough AK

    // Colorado
    '460056': 'Empire Electric Association', // Montezuma County CO

    // Illinois
    '380132': 'Wabash Communications', // Jasper County IL
    '240056': 'Frontier Communications (IL)', // Fayette County IL
    '131180': 'Shawnee Telephone Company', // Hardin County IL

    // Indiana
    '131032': 'New Lisbon Broadband', // Perry County IN

    // Montana
    '420110': 'Ronan Telephone Company', // Ravalli County MT
    '131129': 'Ronan Telephone Company', // Lake County MT
    '520061': 'Montana Internet Corporation', // Missoula County MT

    // Idaho
    '130874': 'Mud Lake Telephone Cooperative', // Clark County ID

    // Nevada
    '130743': 'Lincoln County Telephone System', // Lincoln County NV
    '500082': 'AT&T Nevada', // Pershing County NV

    // New Hampshire
    '370115': 'Consolidated Communications (NH)', // Coos County NH

    // Oregon
    '430011': 'Hunter Communications', // Curry County OR

    // Arkansas
    '130427': 'Ozark Telephone Company', // Newton County AR

    // Florida
    '490018': 'Florida Telephone Company', // Dixie County FL

    // Kansas
    '140092': 'Elk River Telephone', // Elk County KS

    // Mississippi
    '430033': 'Tombigbee Communications', // Alcorn County MS
    '430030': 'East Mississippi Electric Power', // Kemper County MS
    '440099': 'Tishomingo Connect', // Tishomingo County MS
    '430028': 'Delta Telephone Company', // Carroll County MS

    // Puerto Rico
    '450162': 'Liberty Puerto Rico', // Central PR (duplicate ID)
    '460604': 'Claro Puerto Rico', // Western PR (duplicate ID)

    // Utah
    '130106': 'Beehive Telephone Company', // Utah
    '370141': 'Wi-Fiber', // Cache County UT

    // Nevada
    '520035': 'CC Communications', // Churchill County NV

    // Oregon
    '220079': 'Blue Mountain Networks', // Wheeler County OR
    '130986': 'Oregon Telephone Corporation', // Grant County OR

    // Pennsylvania
    '131026': 'Pencor Services', // Pike County PA

    // Texas
    '131476': 'Wes-Tex Telephone Cooperative', // Howard County TX

    // Virginia
    '130610': 'Highland Telephone Cooperative', // Highland County VA

    // Washington
    '130500': 'First Step Internet', // Whitman County WA

};


/**
 * Load top providers from provider summary
 */
async function loadProviders(filePath) {
    const providers = new Map(); // FIPS -> { name, coverage, id }

    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

    let headers = null;
    let colIndices = {};

    for await (const line of rl) {
        const parts = parseCSVLine(line);

        if (!headers) {
            headers = parts;
            colIndices = {
                geographyType: headers.findIndex(h => h === 'geography_type'),
                geographyId: headers.findIndex(h => h === 'geography_id'),
                providerId: headers.findIndex(h => h === 'provider_id'),
                resStPct: headers.findIndex(h => h === 'res_st_pct'),
            };
            continue;
        }

        // Only process County data
        if (parts[colIndices.geographyType] !== 'County') continue;

        const fips = parts[colIndices.geographyId].padStart(5, '0');
        const providerId = parts[colIndices.providerId];
        const coverage = parseFloat(parts[colIndices.resStPct]) || 0;

        // Look up provider name or format the ID nicely
        const providerName = PROVIDER_NAMES[providerId] || `Local ISP #${providerId}`;

        // Create exclusion list for satellite providers (130627 = Hughes, etc)
        const SATELLITE_IDS = ['130627', '130235', '290111', '430076'];

        // Keep the provider with highest coverage
        // Skip satellite unless it's the only option (we prioritize wired)
        // If current top is satellite and new one is not, swap it
        // If current is not satellite and new IS, skip new
        // If both same type, compare coverage

        const isSatellite = SATELLITE_IDS.includes(providerId);
        const currentData = providers.get(fips);
        const currentIsSatellite = currentData ? SATELLITE_IDS.includes(currentData.id) : true;

        if (!currentData) {
            providers.set(fips, { name: providerName, coverage, id: providerId });
        } else if (currentIsSatellite && !isSatellite) {
            // Arrays biased towards terrestrial: Always replace satellite with terrestrial
            providers.set(fips, { name: providerName, coverage, id: providerId });
        } else if (!currentIsSatellite && isSatellite) {
            // Never replace terrestrial with satellite
            continue;
        } else if (currentData.coverage < coverage) {
            // Same type? Compare coverage
            providers.set(fips, { name: providerName, coverage, id: providerId });
        }
    }

    console.log(`✅ Loaded top providers for ${providers.size} counties`);
    return providers;
}

/**
 * Load broadband summary data
 */
async function loadBroadbandData(filePath, ruralFips, providers) {
    const countiesMap = new Map();

    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

    let headers = null;
    let colIndices = {};

    for await (const line of rl) {
        const parts = parseCSVLine(line);

        if (!headers) {
            headers = parts;
            colIndices = {
                areaDataType: headers.findIndex(h => h === 'area_data_type'),
                geographyType: headers.findIndex(h => h === 'geography_type'),
                geographyId: headers.findIndex(h => h === 'geography_id'),
                geographyDesc: headers.findIndex(h => h === 'geography_desc'),
                geographyName: headers.findIndex(h => h === 'geography_name'),
                techType: headers.findIndex(h => h === 'tech_type'),
                speed10_1: headers.findIndex(h => h === 'speed_10_1'),
                speed25_3: headers.findIndex(h => h === 'speed_25_3'),
                speed100_20: headers.findIndex(h => h === 'speed_100_20'),
                speed250_25: headers.findIndex(h => h === 'speed_250_25'),
                speed1000_100: headers.findIndex(h => h === 'speed_1000_100'),
            };
            console.log(`   Broadband columns found: ${Object.keys(colIndices).filter(k => colIndices[k] >= 0).join(', ')}`);
            continue;
        }

        // Only process County data with Total area type
        if (parts[colIndices.geographyType] !== 'County') continue;
        if (parts[colIndices.areaDataType] !== 'Total') continue;

        // Skip specific technology types - we want "All Wired" aggregate data
        const techType = parts[colIndices.techType] || '';
        if (techType && techType !== 'All Wired') continue;

        const fips = parts[colIndices.geographyId].padStart(5, '0');
        const stateFips = fips.substring(0, 2);
        const stateName = STATE_FIPS[stateFips];

        if (!stateName) continue;

        // Parse coverage percentages (these are decimals 0-1)
        const speed10_1 = parseFloat(parts[colIndices.speed10_1]) || 0;
        const speed25_3 = parseFloat(parts[colIndices.speed25_3]) || 0;
        const speed100_20 = parseFloat(parts[colIndices.speed100_20]) || 0;
        const speed250_25 = parseFloat(parts[colIndices.speed250_25]) || 0;
        const speed1000_100 = parseFloat(parts[colIndices.speed1000_100]) || 0;

        // Calculate max available speed and estimated realistic speed
        const maxAvailableSpeed = calculateMaxAvailableSpeed(speed10_1, speed25_3, speed100_20, speed250_25, speed1000_100);
        // Apply 65% multiplier for realistic estimate (most users don't subscribe to max tier)
        const estimatedSpeed = Math.round(maxAvailableSpeed * 0.65);

        // Get county name from geography_desc (format: "County Name, ST")
        let countyName = parts[colIndices.geographyDesc] || parts[colIndices.geographyName] || '';
        countyName = countyName.replace(/,.*$/, '').replace(' County', '').trim();

        if (!countyName) continue;

        // Skip if we already have this FIPS
        if (countiesMap.has(fips)) continue;

        // Get provider and rural status
        const providerData = providers.get(fips);
        const topProvider = providerData ? providerData.name : 'Local ISP';
        const ruralStatus = ruralFips.has(fips);
        const costOfLivingIndex = STATE_COL_INDEX[stateName] || 100;

        countiesMap.set(fips, {
            fips,
            state: stateName,
            stateSlug: createSlug(stateName),
            county: countyName,
            countySlug: createSlug(countyName),
            maxAvailableSpeed,  // Max speed available in the area
            estimatedSpeed,      // Realistic estimate (65% of max)
            topProvider,
            ruralStatus,
            costOfLivingIndex,
            speedRating: getSpeedRating(estimatedSpeed),
            remoteWorkScore: calculateRemoteWorkScore({ estimatedSpeed, costOfLivingIndex, ruralStatus }),
            coverage: {
                speed10_1: Math.round(speed10_1 * 100),
                speed25_3: Math.round(speed25_3 * 100),
                speed100_20: Math.round(speed100_20 * 100),
                speed250_25: Math.round(speed250_25 * 100),
                speed1000_100: Math.round(speed1000_100 * 100),
            }
        });
    }

    const counties = Array.from(countiesMap.values());
    console.log(`✅ Processed ${counties.length} unique counties from broadband data`);
    return counties;
}

/**
 * Calculate max available speed based on coverage tiers
 * Uses the coverage percentages to estimate the highest typical available speed
 */
function calculateMaxAvailableSpeed(s10, s25, s100, s250, s1000) {
    // Calculate the incremental coverage at each tier
    const tier10 = Math.max(0, s10 - s25);      // Only 10 Mbps
    const tier25 = Math.max(0, s25 - s100);     // 25 Mbps but not 100
    const tier100 = Math.max(0, s100 - s250);   // 100 Mbps but not 250
    const tier250 = Math.max(0, s250 - s1000);  // 250 Mbps but not 1000
    const tier1000 = s1000;                      // 1000+ Mbps
    const noService = Math.max(0, 1 - s10);     // No 10Mbps service

    // Calculate weighted max available speed
    const weighted = (
        noService * 5 +
        tier10 * 10 +
        tier25 * 25 +
        tier100 * 100 +
        tier250 * 250 +
        tier1000 * 500       // Cap at 500 for gigabit
    );

    // Round to nearest 5 for cleaner display
    return Math.round(weighted / 5) * 5;
}

/**
 * Speed rating
 */
function getSpeedRating(mbps) {
    if (mbps >= 250) return 'Excellent';
    if (mbps >= 100) return 'Good';
    if (mbps >= 50) return 'Moderate';
    if (mbps >= 25) return 'Basic';
    return 'Poor';
}

/**
 * Remote work score
 */
function calculateRemoteWorkScore(county) {
    let score = 0;
    const speed = county.estimatedSpeed;

    // Speed scoring (0-50 points) - Stricter curve
    // Previously maxed at 150Mbps, now requires 500Mbps+ for max points
    if (speed >= 500) score += 50;       // Gigabit tier
    else if (speed >= 300) score += 45;  // High speed tier
    else if (speed >= 200) score += 40;  // Good fiber/cable
    else if (speed >= 100) score += 30;  // Standard broadband
    else if (speed >= 50) score += 20;   // Basic broadband
    else if (speed >= 25) score += 10;   // Minimum FCC definition

    // Cost of living scoring (0-30 points) - Stricter curve
    // Full points only for very affordable areas (< 85)
    if (county.costOfLivingIndex <= 82) score += 30;
    else if (county.costOfLivingIndex <= 90) score += 25;
    else if (county.costOfLivingIndex <= 98) score += 20;
    else if (county.costOfLivingIndex <= 110) score += 10;
    else score += 5; // Expensive areas get minimal points

    // Rural bonus (0-20 points)
    if (county.ruralStatus) score += 20;
    else score += 5; // Reduced baseline for non-rural

    return Math.min(100, score);
}

/**
 * Find CSV files
 */
function findCSVFiles(directory) {
    const files = fs.readdirSync(directory);
    return {
        broadband: files.find(f => f.includes('fixed_broadband_summary')),
        provider: files.find(f => f.includes('provider_summary')),
        rural: files.find(f => f.includes('rural') || f.includes('cfpb')),
    };
}

/**
 * Main
 */
async function main() {
    const csvDir = path.join(__dirname, '..', 'csv_files');

    if (!fs.existsSync(csvDir)) {
        console.error('❌ csv_files directory not found. Please create it and add FCC CSV files.');
        process.exit(1);
    }

    const csvFiles = findCSVFiles(csvDir);

    if (!csvFiles.broadband || !csvFiles.provider || !csvFiles.rural) {
        console.error('❌ Missing required CSV files. Need:');
        console.error('   - bdc_us_fixed_broadband_summary_by_geography_*.csv');
        console.error('   - bdc_us_provider_summary_by_geography_*.csv');
        console.error('   - cfpb_rural-underserved-list_*.csv');
        process.exit(1);
    }

    console.log('📂 Found CSV files:');
    console.log(`   Broadband: ${csvFiles.broadband}`);
    console.log(`   Provider: ${csvFiles.provider}`);
    console.log(`   Rural: ${csvFiles.rural}`);
    console.log('');

    // Load data
    console.log('📊 Processing data...\n');

    const ruralFips = await loadRuralCounties(path.join(csvDir, csvFiles.rural));
    const providers = await loadProviders(path.join(csvDir, csvFiles.provider));
    const counties = await loadBroadbandData(path.join(csvDir, csvFiles.broadband), ruralFips, providers);

    // Sort by remote work score
    counties.sort((a, b) => b.remoteWorkScore - a.remoteWorkScore);

    // Create output
    const states = [...new Set(counties.map(c => c.state))].sort();

    const output = {
        generatedAt: new Date().toISOString(),
        totalCounties: counties.length,
        totalStates: states.length,
        states,
        counties,
    };

    // Write output
    const dataDir = path.join(__dirname, '..', 'data');
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

    const outputPath = path.join(dataDir, 'counties.json');
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

    console.log(`\n📁 Output: ${outputPath}`);
    console.log(`📈 Total counties: ${output.totalCounties}`);
    console.log(`🗺️  States: ${output.totalStates}`);
    console.log(`🏕️  Rural counties: ${counties.filter(c => c.ruralStatus).length}`);

    // Speed distribution
    const speedDist = {};
    counties.forEach(c => {
        const bucket = Math.floor(c.estimatedSpeed / 50) * 50;
        speedDist[bucket] = (speedDist[bucket] || 0) + 1;
    });
    console.log('\n📊 Estimated Speed Distribution:');
    Object.keys(speedDist).sort((a, b) => a - b).forEach(bucket => {
        console.log(`   ${bucket}-${parseInt(bucket) + 49} Mbps: ${speedDist[bucket]} counties`);
    });

    // Provider distribution
    const providerDist = {};
    counties.forEach(c => {
        providerDist[c.topProvider] = (providerDist[c.topProvider] || 0) + 1;
    });
    console.log('\n🏢 Top 10 Providers:');
    Object.entries(providerDist)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .forEach(([name, count], i) => {
            console.log(`   ${i + 1}. ${name}: ${count} counties`);
        });

    // Top 10 rural
    console.log('\n🏆 Top 10 Rural Counties for Remote Work:');
    counties.filter(c => c.ruralStatus).slice(0, 10).forEach((c, i) => {
        console.log(`   ${i + 1}. ${c.county}, ${c.state} - Score: ${c.remoteWorkScore}, Estimated: ${c.estimatedSpeed} Mbps (Max: ${c.maxAvailableSpeed}), Provider: ${c.topProvider}`);
    });
}

main().catch(console.error);

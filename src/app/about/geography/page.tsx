"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isWap, setIsWap] = useState(false);
  const [isTv, setIsTv] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsWap(width < 240);
      setIsTv(width >= 1921);
      
      // on big screens menu always opened
      if (width >= 640) {
        setMobileOpen(true);
      } else {
        setMobileOpen(false);
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div className={`flex flex-col sm:flex-row min-h-screen bg-[#c0c0c0] ${isWap ? 'text-[8px]' : ''} ${isTv ? 'max-w-[1600px] mx-auto' : ''}`}>
      {/*burger for mobile*/}
      {isMobile && (
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="sm:hidden fixed top-2 left-2 z-50 text-white bg-blue-800 p-2 border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800"
          style={{ 
            boxShadow: 'inset -1px -1px #0f0f0f, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff'
          }}
        >
          {mobileOpen ? "☭" : "卐"}
        </button>
      )}

      {/*navpan*/}
      <nav 
        className={`bg-gray-300 text-black border-r-2 border-r-gray-800 border-b-2 border-b-gray-800 sm:w-64 sm:min-w-[16rem] w-full sm:sticky fixed top-0 z-40 transition-transform duration-300 h-screen overflow-y-auto ${
          isMobile && !mobileOpen ? '-translate-x-full' : 'translate-x-0'
        } ${isTv ? 'w-80 min-w-[20rem]' : ''}`}
      >
        {/*head*/}
        <div className="bg-gradient-to-b from-red-900 to-green-900 text-white p-2 border-b-2 border-b-gray-800 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="text-center flex-grow">
              {!isWap && (
                <div className="text-xs font-bold uppercase tracking-wider mb-1 font-mono italic whitespace-nowrap overflow-hidden text-ellipsis">
                  UNITED MUNICIPALITY<br />OF ENKELINLINNA
                </div>
              )}
              <h1 className="text-sm sm:text-base font-bold leading-tight uppercase font-mono italic break-words">
                {isWap ? (
                  "U.M.S-M."
                ) : (
                  <>CITY<br />OF SAINT-MICHAEL</>
                )}
              </h1>
              <div className="text-xs mt-2 font-mono italic">
                SINCE 1644
              </div>
            </div>
          </div>
        </div>

        {/*menu*/}
        <div className="bg-gray-300 p-1">
          <ul className="flex flex-col space-y-1 text-xs font-bold">
            
            {/*homepage*/}
            <li>
              <Link href="/" className="block px-2 py-1 bg-gray-300 border border-t-white border-l-white border-b-gray-800 
              border-r-gray-800 hover:bg-black hover:text-white transition-all font-mono italic uppercase whitespace-nowrap overflow-hidden text-ellipsis"
                style={{ 
                  boxShadow: 'inset -1px -1px #0f0f0f, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff' 
                }}>
                HOMEPAGE
              </Link>
            </li>

            {/*about city*/}
            <li>
              <button
                onClick={() => toggleMenu("about")}
                className="flex items-center justify-between w-full px-2 py-1 bg-gray-300 border border-t-white border-l-white
                 border-b-gray-800 border-r-gray-800 hover:bg-black hover:text-white transition-all font-mono italic uppercase whitespace-nowrap"
                style={{ 
                  boxShadow: 'inset -1px -1px #0f0f0f, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff' 
                }}
              >
                <span className="overflow-hidden text-ellipsis">ABOUT MUNICIPALITY</span>
                <span>{openMenu === "about" ? '▼' : '▶'}</span>
              </button>
              {openMenu === "about" && (
                <ul className="ml-4 mt-1 space-y-1 bg-gray-300 border border-t-white border-l-white border-b-gray-800 border-r-gray-800 p-1">
                  <li><a href="/about/history" className="block px-2 py-1 text-xs bg-gray-300 border border-t-white
                   border-l-white border-b-gray-800 border-r-gray-800 hover:bg-black hover:text-white font-mono italic uppercase whitespace-nowrap overflow-hidden text-ellipsis"
                   style={{ 
                    boxShadow: 'inset -1px -1px #0f0f0f, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff' 
                  }}>HISTORY</a></li>
                  <li><a href="/about/geography" className="block px-2 py-1 text-xs bg-gray-300 border border-t-white
                   border-l-white border-b-gray-800 border-r-gray-800 hover:bg-black hover:text-white font-mono italic uppercase whitespace-nowrap overflow-hidden text-ellipsis"
                   style={{ 
                    boxShadow: 'inset -1px -1px #0f0f0f, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff' 
                  }}>GEOGRAPHY</a></li>
                </ul>
              )}
            </li>

            {/*city government*/}
            <li>
              <button
                onClick={() => toggleMenu("council")}
                className="flex items-center justify-between w-full px-2 py-1 bg-gray-300 border border-t-white border-l-white 
                border-b-gray-800 border-r-gray-800 hover:bg-black hover:text-white transition-all font-mono italic uppercase whitespace-nowrap"
                style={{ 
                  boxShadow: 'inset -1px -1px #0f0f0f, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff' 
                }}
              >
                <span className="overflow-hidden text-ellipsis">{isWap ? "GOVERNMENT" : "GOVERNMENT"}</span>
                <span>{openMenu === "council" ? '▼' : '▶'}</span>
              </button>
              {openMenu === "council" && (
                <ul className="ml-4 mt-1 space-y-1 bg-gray-300 border border-t-white border-l-white border-b-gray-800 border-r-gray-800 p-1">
                  <li><a href="/government/administration" className="block px-2 py-1 text-xs bg-gray-300 border border-t-white
                   border-l-white border-b-gray-800 border-r-gray-800 hover:bg-black hover:text-white font-mono italic uppercase whitespace-nowrap overflow-hidden text-ellipsis"
                   style={{ 
                    boxShadow: 'inset -1px -1px #0f0f0f, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff' 
                  }}>ADMINISTRATION</a></li>
                  <li><a href="/government/council" className="block px-2 py-1 text-xs bg-gray-300 border border-t-white
                   border-l-white border-b-gray-800 border-r-gray-800 hover:bg-black hover:text-white font-mono italic uppercase whitespace-nowrap overflow-hidden text-ellipsis"
                   style={{ 
                    boxShadow: 'inset -1px -1px #0f0f0f, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff' 
                  }}>{isWap ? "COUNCIL" : "COUNCIL"}</a></li>
                </ul>
              )}
            </li>

            

            {/*emergency services*/}
            <li>
              <button
                onClick={() => toggleMenu("emergency")}
                className="flex items-center justify-between w-full px-2 py-1 bg-red-800 text-white border border-t-white border-l-white
                 border-b-gray-800 border-r-gray-800 hover:bg-red-900 transition-all font-mono italic uppercase whitespace-nowrap"
                style={{ 
                  boxShadow: 'inset -1px -1px #0f0f0f, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff' 
                }}
              >
                <span className="overflow-hidden text-ellipsis">EMERGENCY</span>
                <span>{openMenu === "emergency" ? '▼' : '▶'}</span>
              </button>
              {openMenu === "emergency" && (
                <ul className="ml-4 mt-1 space-y-1 bg-red-200 border border-t-white border-l-white border-b-gray-800 border-r-gray-800 p-1">
                  <li><a href="/emergency/police" className="block px-2 py-1 text-xs bg-red-800 text-white border border-t-white border-l-white
                   border-b-gray-800 border-r-gray-800 hover:bg-blue-900 hover:text-white font-mono italic uppercase whitespace-nowrap overflow-hidden text-ellipsis"
                   style={{ 
                    boxShadow: 'inset -1px -1px #0f0f0f, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff' 
                  }}>POLICE</a></li>
                  <li><a href="/emergency/defense" className="block px-2 py-1 text-xs bg-red-800 text-white border border-t-white border-l-white
                   border-b-gray-800 border-r-gray-800 hover:bg-blue-900 hover:text-white font-mono italic uppercase whitespace-nowrap overflow-hidden text-ellipsis"
                   style={{ 
                    boxShadow: 'inset -1px -1px #0f0f0f, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff' 
                  }}>DEFENSE</a></li>
                  <li><a href="/emergency/medical" className="block px-2 py-1 text-xs bg-red-800 text-white border border-t-white border-l-white
                   border-b-gray-800 border-r-gray-800 hover:bg-blue-900 hover:text-white font-mono italic uppercase whitespace-nowrap overflow-hidden text-ellipsis"
                   style={{ 
                    boxShadow: 'inset -1px -1px #0f0f0f, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff' 
                  }}>MEDICAL</a></li>
                </ul>
              )}
            </li>

            {/*contacts*/}
            <li>
              <button
                onClick={() => toggleMenu("contacts")}
                className="flex items-center justify-between w-full px-2 py-1 bg-gray-300 border border-t-white border-l-white 
                border-b-gray-800 border-r-gray-800 hover:bg-black hover:text-white transition-all font-mono italic uppercase whitespace-nowrap"
                style={{ 
                  boxShadow: 'inset -1px -1px #0f0f0f, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff' 
                }}
              >
                <span className="overflow-hidden text-ellipsis">CONTACTS</span>
                <span>{openMenu === "contacts" ? '▼' : '▶'}</span>
              </button>
              {openMenu === "contacts" && (
                <ul className="ml-4 mt-1 space-y-1 bg-gray-300 border border-t-white border-l-white border-b-gray-800 border-r-gray-800 p-1">
                  <li><a href="/contacts/reception" className="block px-2 py-1 text-xs bg-gray-300 border
                   border-t-white border-l-white border-b-gray-800 border-r-gray-800 hover:bg-black hover:text-white font-mono italic uppercase whitespace-nowrap overflow-hidden text-ellipsis"
                   style={{ 
                    boxShadow: 'inset -1px -1px #0f0f0f, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff' 
                  }}>RECEPTION</a></li>
                  <li><a href="/contacts/departments" className="block px-2 py-1 text-xs bg-gray-300 border
                   border-t-white border-l-white border-b-gray-800 border-r-gray-800 hover:bg-black hover:text-white font-mono italic uppercase whitespace-nowrap overflow-hidden text-ellipsis"
                   style={{ 
                    boxShadow: 'inset -1px -1px #0f0f0f, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff' 
                  }}>DEPARTAMENTS</a></li>
                  <li><a href="/contacts/hotline" className="block px-2 py-1 text-xs bg-gray-300 border
                   border-t-white border-l-white border-b-gray-800 border-r-gray-800 hover:bg-black hover:text-white font-mono italic uppercase whitespace-nowrap overflow-hidden text-ellipsis"
                   style={{ 
                    boxShadow: 'inset -1px -1px #0f0f0f, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff' 
                  }}>HOTLINE</a></li>
                </ul>
              )}
            </li>
          </ul>

          {/*footer*/}
          <div className="p-2 border-t-2 border-t-gray-800 border-l-2 border-l-white bg-gray-300 text-xs text-center mt-2 border-r-2 border-r-gray-800 border-b-2 border-b-white">
            <div className="text-red-800 font-bold mb-2 font-mono italic uppercase break-words">
              STATE OF EMERGENCY: 7778 DAYS UNDER MARTIAL LAW PROVISIONS.
            </div>
            <div className="text-gray-800 font-mono italic uppercase break-words">
              © 1991-1998. City of Santa-Michael, Enkelinlinna United Municipality, Aurinfjall Republic
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-grow p-4 sm:ml-0 mt-12 sm:mt-0">
        <div className="bg-white border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800 p-4">
            {/* info about geography */}
            <div className="bg-[#c0c0c0] border-2 border-t-white border-l-white border-b-gray-800 border-r-gray-800 p-3">
              <h2 className="text-lg font-bold text-[#000080] font-mono mb-2 border-b border-gray-600 pb-1">
               GEOGRAPHY OF SANTA-MICHAEL
              </h2>
              <div className="space-y-2">
                <div className="w-full bg-white border text-black border-gray-400 p-2">
                    <p className="text-xs font-mono font-bold italic">Santa-Micael is located on the western coast of the state of Aurinfjall, 
                    within the greater metropolitan area of Enkelinlinna, though it retains a distinctly independent character. The city stretches along a broad coastal plain facing the Pacific Ocean, 
                    with sand dunes and natural beach parks beginning to the north, while to the east rise the first foothills of the Vinewood Range, forming a natural boundary between the shoreline and the inland territories. 
                    To the south of Santa-Micael lies an industrial and port district, connected by major highways and rail lines that extend deep into the state.</p>
                    <p className="text-xs font-mono italic"> </p>
                    <p className="text-xs font-mono font-bold italic">The coastline of Santa-Micael is remarkably even: a long sandy beach runs almost uninterrupted, 
                    interrupted only in its central section by the iconic pier that juts far into the ocean. The beachfront gradually transitions into the urban promenade, 
                    and further inland into central districts of low-rise construction, which are increasingly replaced by residential towers and business centers. 
                    Along the coast runs a continuous promenade with bicycle and pedestrian paths, which to the north merges with protected zones and the large seaside park.</p>
                    <p className="text-xs font-mono italic"> </p>
                    <p className="text-xs font-mono font-bold italic">Further east, near the hillsides, are the prestigious residential areas, 
                    offering panoramic views of the ocean and the coastal quarters below. Here the terrain becomes more varied, with neighborhoods climbing ridges or sinking into small ravines, 
                    creating the patchwork geography of development typical for the region. To the southeast, the city gradually loses its resort appearance and blends into industrial lands and poorer districts, 
                    where narrow streets and warehouse complexes form a different, less touristic landscape.</p>
                    <p className="text-xs font-mono italic"> </p>
                    <p className="text-xs font-mono font-bold italic">Thus, the geography of Santa-Micael is defined by the combination of its oceanfront, the rising hilly terrain to the east, 
                    and the industrial outskirts to the south. The city is both enclosed by natural boundaries and open toward the Pacific, making it a quintessential resort hub of Aurinfjall while still 
                    closely tied to the vast urban complex of Enkelinlinna.</p>
                    <p className="text-xs font-mono italic"> </p>
                    <p className="text-xs font-mono font-bold italic">Santa-Micael has a Mediterranean coastal climate typical of the western regions of Aurinfjall, characterized by warm, dry summers and mild, wetter winters. 
                    Its proximity to the Pacific Ocean strongly moderates temperature extremes, ensuring that seasonal variations are never too harsh.</p>
                    <p className="text-xs font-mono italic"> </p>
                    <p className="text-xs font-mono font-bold italic">Summers in Santa-Micael are long, sunny, and dry. Average daytime temperatures range between 25–30°C (77–86°F), though ocean breezes often bring relief even during peak heat. 
                    Nights are cooler, dropping to around 16–18°C (61–64°F). Rainfall during this season is almost nonexistent, which contributes to frequent drought warnings and water restrictions, especially in inland neighborhoods 
                    further from the coast.</p>
                    <p className="text-xs font-mono italic"> </p>
                    <p className="text-xs font-mono font-bold italic">Winters are mild and relatively short, with temperatures rarely falling below 10°C (50°F). Daytime highs often reach 18–20°C (64–68°F), 
                    while nights remain cool but not cold. The bulk of the annual rainfall occurs between December and March, typically in the form of short, heavy storms carried in by Pacific weather systems. 
                    These rains replenish groundwater reserves and temporarily green the surrounding hillsides, though they can also trigger mudslides in the more steeply developed eastern slopes.</p>
                    <p className="text-xs font-mono italic"> </p>
                    <p className="text-xs font-mono font-bold italic">Humidity in Santa-Micael stays moderate year-round, with the ocean acting as a stabilizing factor. 
                    Morning fog is a common phenomenon in late spring and early summer, when cooler ocean air meets warmer inland temperatures. 
                    This so-called “Micael Fog” often blankets the coastline until midday, only to clear into bright, cloudless skies.</p>
                    <p className="text-xs font-mono italic"> </p>
                    <p className="text-xs font-mono font-bold italic">The city also experiences strong coastal winds in the afternoons, especially during summer, 
                    making Santa-Micael a popular spot for surfing, sailing, and other water sports. Inland districts, however, feel hotter and less breezy, especially where urban density traps heat. 
                    Overall, the climate of Santa-Micael combines the allure of a sunny, oceanfront paradise with subtle seasonal contrasts that shape both the city’s natural environment and its rhythms of daily life.</p>
                    <p className="text-xs font-mono italic"> </p>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react'
import PrimaryBtn from '../primaryBtn';
import Image from 'next/image';

const Navbar = () => {
  return (
    <header class="bg-neutral-base text-white">
      <nav class="px-[10px] xl:px-[80px] flex justify-between sm:items-center">
        <div class="flex gap-[10px] sm:items-center">
          <div class="w-[30px] h-[30px] m-2 sm:m-0 md:w-[40px] md:h-[40px] lg:w-[48px] lg:h-[48px]">
            <a href="/conferences">
              {" "}
              <Image src={logo_sign} alt="logo sign" />
            </a>
          </div>
          <h1 class="text-[28px] hidden lg:block">
            <a href="/conferences" class="text-[#ffffffb8]">
              Dev<span class="font-bold text-white">Resources</span>
            </a>
          </h1>
        </div>
        <div class="flex gap-[10px] lg:gap-[20px] xl:gap-[32px] items-center py-[7px] sm:py-0">
          <ul class="hidden sm:flex gap-[10px] lg:gap-[20px] xl:gap-[32px]">
            {menu.map((item) => {
              const path = new URL(Astro.url.href).pathname;
              const isActive =
                path === item.url
                  ? "border-b-4 gradient-border-bottom font-[700]"
                  : "text-neutral-200 font-[400]";
              return (
                <li>
                  <a
                    class={`inline-block text-[12px] sm:text-[13px] xl:text-[16px] leading-[60px] lg:leading-[80px] no-underline hover:text-white ${isActive}`}
                    href={item.url}
                  >
                    {item.text}
                  </a>
                </li>
              );
            })}
          </ul>
          <PrimaryBtn text="Submit New" />
          {/* <MobileMenu /> */}
        </div>
      </nav>
    </header>
  );
}

export default Navbar

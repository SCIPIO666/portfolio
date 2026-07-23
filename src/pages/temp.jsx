  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });


      tl.from(watermark.current, {
        opacity: 0,
        scale: 1.4,
        rotate: -15,
        duration: 1.6,
        ease: "power2.out",
      });


      tl.from(
        intro.current,
        {
          opacity: 0,
          x: -150,
          duration: 0.6,
          ease: "power4.out",
        },
        "-=1"
      );

      //  split
      const nameElement = nameRef.current;
      const chars = new SplitType(nameElement, { 
        types: "chars",
        tagName: "span"
      });

      chars.chars.forEach((char) => {
        char.style.display = "inline-block";
      });

      // Drop animation 
      tl.from(
        chars.chars,
        {
          y: -300,
          rotationX: -80,
          opacity: 0,
          duration: 1.2,
          ease: "elastic.out(1, 0.4)",
          stagger: 0.03,
        },
        "-=0.2"
      );

      // shockwave effect 
      tl.to(
        chars.chars,
        {
          y: -12,
          duration: 0.15,
          stagger: 0.03,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
          onComplete: () => {
            // Reset 
            gsap.to(chars.chars, {
              y: 0,
              duration: 0.2,
              ease: "power2.out",
            });
          },
        },
        "+=0.1"
      );


      tl.from(
        title.current,
        {
          opacity: 0,
          x: 300,
          duration: 0.9,
          ease: "power4.out",
        },
        "-=0.3"
      );


      tl.from(
        desc.current,
        {
          opacity: 0,
          x: -120,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5"
      );


      // Buttons 

      tl.from(
        buttons.current.children,
        {
          opacity: 0,
          scale: 0,
          y: 30,
          stagger: 0.12,
          duration: 0.5,
          ease: "back.out(2)",
        },
        "-=0.4"
      );


      tl.from(
        status.current,
        {
          opacity: 0,
          duration: 0.5,
        },
        "-=0.2"
      );

      //persists
      gsap.to(watermark.current, {
        y: -20,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

    },
    { scope: hero }
  );
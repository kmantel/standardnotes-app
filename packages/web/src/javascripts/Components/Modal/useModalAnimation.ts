import { useLifecycleAnimation } from '@/Hooks/useLifecycleAnimation'

export const IosModalAnimationEasing = 'cubic-bezier(.36,.66,.04,1)'

const Animations = {
  vertical: {
    enter: {
      keyframes: [
        {
        },
        {
        },
      ],
      transformOrigin: 'bottom',
    },
    exit: {
      keyframes: [
        {
        },
      ],
      transformOrigin: 'bottom',
    },
  },
  horizontal: {
    enter: {
      keyframes: [
        {
        },
        {
        },
      ],
      transformOrigin: 'right',
    },
    exit: {
      keyframes: [
        {
        },
        {
        },
      ],
      transformOrigin: 'right',
    },
  },
  nonMobile: {
    enter: {
      keyframes: [
        {
          transform: 'scale(1)',
          opacity: 0,
        },
        {
          transform: 'scale(1)',
          opacity: 1,
        },
      ],
      transformOrigin: 'center',
    },
    exit: {
      keyframes: [
        {
          transform: 'scale(1)',
          opacity: 1,
        },
        {
          transform: 'scale(1)',
          opacity: 0,
        },
      ],
      transformOrigin: 'center',
    },
  },
}

export const MobileModalAnimationOptions = {
  easing: IosModalAnimationEasing,
  duration: 0,
  fill: 'forwards',
} as const

const NonMobileOptions = {
  duration: 0,
}

export const useModalAnimation = (
  isOpen: boolean,
  isMobileScreen: boolean,
  variant: 'horizontal' | 'vertical' = 'vertical',
  disabled = false,
) => {
  return useLifecycleAnimation(
    {
      open: isOpen,
      enter: {
        keyframes: isMobileScreen ? Animations[variant].enter.keyframes : Animations.nonMobile.enter.keyframes,
        options: isMobileScreen ? MobileModalAnimationOptions : NonMobileOptions,
        initialStyle: {
          transformOrigin: isMobileScreen
            ? Animations[variant].enter.transformOrigin
            : Animations.nonMobile.enter.transformOrigin,
        },
      },
      enterCallback: (element) => {
        if (!isMobileScreen) {
          return
        }
        element.scrollTop = 0
      },
      exit: {
        keyframes: isMobileScreen ? Animations[variant].exit.keyframes : Animations.nonMobile.exit.keyframes,
        options: isMobileScreen ? MobileModalAnimationOptions : NonMobileOptions,
        initialStyle: {
          transformOrigin: isMobileScreen
            ? Animations[variant].exit.transformOrigin
            : Animations.nonMobile.exit.transformOrigin,
        },
      },
    },
    disabled,
  )
}

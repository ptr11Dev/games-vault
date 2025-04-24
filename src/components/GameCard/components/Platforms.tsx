import AndroidIcon from '@/icons/android.svg?react';
import LinuxIcon from '@/icons/linux.svg?react';
import MacIcon from '@/icons/mac.svg?react';
import NintendoIcon from '@/icons/nintendo.svg?react';
import PcIcon from '@/icons/pc.svg?react';
import PsIcon from '@/icons/ps.svg?react';
import XboxIcon from '@/icons/xbox.svg?react';
import { AvailablePlatforms } from '@/types';

type PlatformsProps = {
  platforms: AvailablePlatforms[];
};

const Platforms = ({ platforms }: PlatformsProps) => {
  return (
    <div className="absolute top-1/2 left-2 flex -translate-y-1/2 flex-col items-center gap-3">
      {platforms.includes('pc') && <PcIcon height={20} />}
      {platforms.includes('playstation') && <PsIcon height={20} />}
      {platforms.includes('xbox') && <XboxIcon height={20} />}
      {platforms.includes('nintendo') && <NintendoIcon height={20} />}
      {platforms.includes('mac') && <MacIcon height={20} />}
      {platforms.includes('linux') && <LinuxIcon height={20} />}
      {platforms.includes('android') && <AndroidIcon height={20} />}
    </div>
  );
};

export default Platforms;

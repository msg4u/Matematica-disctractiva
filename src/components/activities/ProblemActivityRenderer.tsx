import React from 'react';
import { UiTranslations } from '../../translations';
import { AppleBasketActivity } from './AppleBasketActivity';
import { CatsCornersActivity } from './CatsCornersActivity';
import { TenChairsActivity } from './TenChairsActivity';
import { TokenParityGridActivity } from './TokenParityGridActivity';
import { MagicTriangleActivity } from './MagicTriangleActivity';
import { RiverCrossingActivity } from './RiverCrossingActivity';
import { ThreePilesActivity } from './ThreePilesActivity';
import { TrainsMeetingActivity } from './TrainsMeetingActivity';
import { ClockChimesActivity } from './ClockChimesActivity';
import { FlyCyclistsActivity } from './FlyCyclistsActivity';

interface ProblemActivityRendererProps {
  problemId: number;
  t: UiTranslations;
  isSolutionMode?: boolean;
  onSuccess?: () => void;
  isSolved?: boolean;
}

export const ProblemActivityRenderer: React.FC<ProblemActivityRendererProps> = ({
  problemId,
  t,
  isSolutionMode = false,
  onSuccess,
  isSolved = false
}) => {
  switch (problemId) {
    case 1:
      return <AppleBasketActivity t={t} isSolutionMode={isSolutionMode} onSuccess={onSuccess} isSolved={isSolved} />;
    case 2:
      return <CatsCornersActivity t={t} isSolutionMode={isSolutionMode} onSuccess={onSuccess} isSolved={isSolved} />;
    case 3:
      return <TenChairsActivity t={t} isSolutionMode={isSolutionMode} onSuccess={onSuccess} isSolved={isSolved} />;
    case 4:
      return <TokenParityGridActivity t={t} isSolutionMode={isSolutionMode} onSuccess={onSuccess} isSolved={isSolved} />;
    case 5:
      return <MagicTriangleActivity t={t} isSolutionMode={isSolutionMode} onSuccess={onSuccess} isSolved={isSolved} />;
    case 6:
      return <RiverCrossingActivity t={t} isSolutionMode={isSolutionMode} onSuccess={onSuccess} isSolved={isSolved} />;
    case 7:
      return <ThreePilesActivity t={t} isSolutionMode={isSolutionMode} onSuccess={onSuccess} isSolved={isSolved} />;
    case 8:
      return <TrainsMeetingActivity t={t} isSolutionMode={isSolutionMode} onSuccess={onSuccess} isSolved={isSolved} />;
    case 9:
      return <ClockChimesActivity t={t} isSolutionMode={isSolutionMode} onSuccess={onSuccess} isSolved={isSolved} />;
    case 10:
      return <FlyCyclistsActivity t={t} isSolutionMode={isSolutionMode} onSuccess={onSuccess} isSolved={isSolved} />;
    default:
      return null;
  }
};

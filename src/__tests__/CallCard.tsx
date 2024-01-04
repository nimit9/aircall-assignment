import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CALL_DETAIL from './mockData/CallDetail.json';
import CallCard from '../components/calls/CallCard';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from '@/context/context';

describe('CallCardComponent', () => {
    it('should render Call Card with correct info', () => {
        render(
            <BrowserRouter>
                <AppProvider>
                    <CallCard callDetails={CALL_DETAIL} />
                </AppProvider>
            </BrowserRouter>,
        );

        expect(screen.getByText(CALL_DETAIL.from)).toBeInTheDocument();
    });
    it('should render Call Card with Outgoing Icon when direction is outbound', () => {
        render(
            <BrowserRouter>
                <AppProvider>
                    <CallCard
                        callDetails={{ ...CALL_DETAIL, direction: 'outbound' }}
                    />
                </AppProvider>
            </BrowserRouter>,
        );

        expect(
            screen.getByTestId('outbound-call-card-icon'),
        ).toBeInTheDocument();
    });
});

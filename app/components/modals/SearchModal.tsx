'use client';

import qs from "query-string";
import { formatISO } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";

import Modal from "./Modal";
import Heading from "../Heading";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";

import useSearchModal from "@/app/hooks/useSearchModal";
import dynamic from "next/dynamic";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2
}

const SearchModal = () => {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();

  const [location, setLocation] = useState<CountrySelectValue>();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });

  const Map = useMemo(() => dynamic(() => import('../Map'), {
    ssr: false,
  }), []);

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery
    }, { skipNull: true });

    setStep(STEPS.LOCATION);
    searchModal.onClose();

    router.push(url);
  }, [step, searchModal, location, router, guestCount, roomCount, bathroomCount, dateRange, onNext, params]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return 'Pesquisar';
    }

    return 'Próximo';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }

    return 'Voltar';
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Para onde você deseja ir?"
        subtitle="Encontre a localização perfeita aqui!"
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  )

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
      <Heading
        title="Quando você planeja ir?"
        subtitle="Escolha a melhor data para sua viagem!"
      />
      <Calendar
        value={dateRange}
        onChange={(value) => setDateRange(value.selection)}
      />
      </div>
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
      <Heading
        title="Mais informações"
        subtitle="Encontre o lugar perfeito!"
      />
      <Counter
        title="Hóspedes"
        subtitle="Informe a quantidade total de hóspedes"
        value={guestCount}
        onChange={(value) => setGuestCount(value)}
      />
      <Counter
        title="Quartos"
        subtitle="Informe a quantidade de quartos que deseja"
        value={roomCount}
        onChange={(value) => setRoomCount(value)}
      />
      <Counter
        title="Banheiros"
        subtitle="Informe a quantidade de banheiros que deseja"
        value={bathroomCount}
        onChange={(value) => setBathroomCount(value)}
      />
      </div>
    )
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Filtros"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      body={bodyContent}
    />
  )
}

export default SearchModal

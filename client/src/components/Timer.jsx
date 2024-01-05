import { Box, HStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useMemo } from "react";

const SECOND = 1_000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const Timer = ({ deadline = new Date().toString(), className, active }) => {
  const parsedDeadline = useMemo(() => Date.parse(deadline), [deadline]);
  const [init, setInit] = useState(false);
  const [time, setTime] = useState(parsedDeadline - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      if (parsedDeadline - Date.now() > 0) {
        setTime(parsedDeadline - Date.now());
      } else {
        if (!init) {
          setInit(true);
          clearInterval(interval);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [parsedDeadline]);

  return (
    <Box
      className={active ? "bg-emerald-500" : "bg-red-400"}
      padding={2}
      paddingX={4}
      rounded={"xl"}
      fontSize={"xl"}
      fontWeight={"semibold"}
    >
      {active ? (
        <HStack>
          {Object.entries({
            days: time / DAY,
            hours: (time / HOUR) % 24,
            minutes: (time / MINUTE) % 60,
            seconds: (time / SECOND) % 60,
          }).map(([label, value]) => (
            <div key={label}>
              <div>
                <div>
                  <span>{`${Math.floor(value)}`.padStart(2, "0")}</span>
                  <span>{label[0]}</span>
                </div>
              </div>
            </div>
          ))}
        </HStack>
      ) : (
        <Box px="4">Auction Inactive</Box>
      )}
    </Box>
  );
};

export default Timer;

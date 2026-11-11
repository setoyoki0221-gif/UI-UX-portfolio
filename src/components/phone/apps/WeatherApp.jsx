import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { getPhoneText } from "@/data/phone/translations";

const WeatherEmoji = (weatherCode, size = 24, isDay = 1) => {
  const sizePx = size === 56 ? "56px" : size === 24 ? "24px" : "20px";
  return weatherCode === 0 ? (
    <span
      style={{
        fontSize: sizePx,
        lineHeight: 1,
      }}
    >
      {isDay ? "☀️" : "🌙"}
    </span>
  ) : weatherCode <= 3 ? (
    <span
      style={{
        fontSize: sizePx,
        lineHeight: 1,
      }}
    >
      ☁️
    </span>
  ) : weatherCode <= 67 ? (
    <span
      style={{
        fontSize: sizePx,
        lineHeight: 1,
      }}
    >
      🌧️
    </span>
  ) : weatherCode <= 77 ? (
    <span
      style={{
        fontSize: sizePx,
        lineHeight: 1,
      }}
    >
      ❄️
    </span>
  ) : (
    <span
      style={{
        fontSize: sizePx,
        lineHeight: 1,
      }}
    >
      🌦️
    </span>
  );
};

const weatherCodeToEmoji = (weatherCode) =>
  weatherCode === 0 ? "☀️" : weatherCode <= 3 ? "☁️" : weatherCode <= 67 ? "🌧️" : weatherCode <= 77 ? "❄️" : "🌦️";

export function WeatherApp({ onClose, onStartClose }) {
  const { language } = useLanguage(),
    t = getPhoneText(language),
    [weather, setWeather] = useState(null),
    [loading, setLoading] = useState(true),
    [visible, setVisible] = useState(false);
  useEffect(() => {
    requestAnimationFrame(() => {
      setVisible(true);
    });
    (async () => {
      try {
        const forecast = await (
            await fetch(
              "https://api.open-meteo.com/v1/forecast?latitude=35.4437&longitude=139.6380&current=temperature_2m,weather_code,is_day&hourly=temperature_2m,weather_code,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=Asia%2FTokyo&forecast_days=7",
            )
          ).json(),
          currentHour = new Date().getHours(),
          hourlyForecast = [];
        for (let i = 0; i < 24; i++) {
          const hourIndex = currentHour + i;
          hourIndex < 24
            ? hourlyForecast.push({
                time: forecast.hourly.time[hourIndex],
                temp: Math.round(forecast.hourly.temperature_2m[hourIndex]),
                icon: forecast.hourly.weather_code[hourIndex],
                isDay: forecast.hourly.is_day[hourIndex],
              })
            : hourIndex - 24 < forecast.hourly.time.length &&
              hourlyForecast.push({
                time: forecast.hourly.time[hourIndex],
                temp: Math.round(forecast.hourly.temperature_2m[hourIndex]),
                icon: forecast.hourly.weather_code[hourIndex],
                isDay: forecast.hourly.is_day[hourIndex],
              });
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dailyForecast = forecast.daily.time
          .map((dateString, dayIndex) => ({
            day: dateString,
            date: new Date(dateString).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
            icon: forecast.daily.weather_code[dayIndex],
            high: Math.round(forecast.daily.temperature_2m_max[dayIndex]),
            low: Math.round(forecast.daily.temperature_2m_min[dayIndex]),
            sunrise: forecast.daily.sunrise[dayIndex],
            sunset: forecast.daily.sunset[dayIndex],
          }))
          .filter((entry) => {
            const dateParts = entry.day.split("-");
            return new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2])) >= today;
          });
        setWeather({
          location: t.profile.location,
          current: {
            temp: Math.round(forecast.current.temperature_2m),
            condition:
              forecast.current.weather_code === 0
                ? t.weather.sunny
                : forecast.current.weather_code <= 3
                  ? t.weather.cloudy
                  : forecast.current.weather_code <= 77
                    ? t.weather.snowy
                    : t.weather.rainy,
            icon: forecast.current.weather_code,
            isDay: forecast.current.is_day,
          },
          hourly: hourlyForecast,
          daily: dailyForecast,
        });
      } catch (error) {
        console.error("Weather fetch error:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [t.profile.location, t.weather.cloudy, t.weather.rainy, t.weather.snowy, t.weather.sunny]);
  const handleClose = () => {
    onStartClose && onStartClose();
    setVisible(false);
    setTimeout(onClose, 300);
  };
  if (loading || !weather)
    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(to bottom, #4A90E2 0%, #2E5C8A 100%)",
          zIndex: 200,
          borderRadius: "2.5rem",
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1)" : "scale(0.92)",
          transition: "opacity 0.3s ease-out, transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
      >
        <div className="w-8 h-8 border-3 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    );
  const formatHour = (isoString) => {
      const date = new Date(isoString);
      date.getHours();
      return new Intl.DateTimeFormat(language === "ja" ? "ja-JP" : "en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: language !== "ja",
        timeZone: "Asia/Tokyo",
      }).format(date);
    },
    getDayLabel = (isoString, dayIndex) =>
      dayIndex === 0
        ? t.common.today
        : new Date(isoString).toLocaleDateString(language === "ja" ? "ja-JP" : "en-US", {
            weekday: "long",
            timeZone: "Asia/Tokyo",
          }),
    formatDate = (isoString) =>
      new Date(isoString).toLocaleDateString(language === "ja" ? "ja-JP" : "en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "Asia/Tokyo",
      }),
    formatSunTime = (isoString) => {
      var timePart;
      const hhmm = ((timePart = isoString.split("T")[1]) == null ? void 0 : timePart.slice(0, 5)) ?? isoString,
        [hours, minutes] = hhmm.split(":").map(Number),
        period = hours >= 12 ? (language === "ja" ? "午後" : "PM") : language === "ja" ? "午前" : "AM",
        displayHour = hours % 12 || 12;
      return language === "ja"
        ? `${period}${displayHour}:${minutes.toString().padStart(2, "0")}`
        : `${displayHour}:${minutes.toString().padStart(2, "0")} ${period}`;
    };
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 200,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
        borderRadius: "2.5rem",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        touchAction: "none",
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.92)",
        transition: "opacity 0.3s ease-out, transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
        pointerEvents: visible ? "auto" : "none",
      }}
      onTouchMove={(event) => event.stopPropagation()}
      onTouchStart={(event) => event.stopPropagation()}
    >
      <div
        style={{
          background: "linear-gradient(to bottom, #4A90E2 0%, #2E5C8A 100%)",
          paddingTop: "3.5rem",
          paddingBottom: "1.5rem",
          paddingLeft: "1.25rem",
          paddingRight: "1.25rem",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1.5rem",
            position: "relative",
          }}
        >
          <button
            onClick={handleClose}
            style={{
              position: "absolute",
              left: 0,
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
              color: "white",
              fontSize: "17px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <span
            style={{
              fontSize: "17px",
              fontWeight: 600,
              color: "white",
            }}
          >
            {t.apps.weather}
          </span>
        </div>
        <div
          style={{
            textAlign: "center",
            marginBottom: "0.5rem",
          }}
        >
          <h1
            style={{
              fontSize: "28px",
              fontWeight: 500,
              color: "white",
              margin: 0,
            }}
          >
            {weather.location}
          </h1>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            marginBottom: "1rem",
          }}
        >
          {WeatherEmoji(weather.current.icon, 56, weather.current.isDay)}
          <div
            style={{
              fontSize: "96px",
              fontWeight: 200,
              color: "white",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            {weather.current.temp}°
          </div>
        </div>
        <div
          style={{
            display: "flex",
            overflowX: "auto",
            alignItems: "center",
            padding: "0.75rem 0.5rem",
            borderRadius: "1rem",
            background: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
            gap: "1rem",
          }}
          className="no-scrollbar"
        >
          {weather.hourly.map((hour, index) => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.375rem",
                minWidth: "50px",
                flexShrink: 0,
              }}
              key={index}
            >
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "rgba(255, 255, 255, 0.9)",
                }}
              >
                {formatHour(hour.time)}
              </div>
              {WeatherEmoji(hour.icon, 20, hour.isDay)}
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "white",
                }}
              >
                {hour.temp}°
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          flex: 1,
          background: "white",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
        className="no-scrollbar"
      >
        <div
          style={{
            padding: "1rem 1.25rem 0.75rem",
            flexShrink: 0,
          }}
        >
          <h3
            style={{
              fontSize: "15px",
              fontWeight: 600,
              color: "#000",
              margin: 0,
            }}
          >
            {t.weather.forecast}
          </h3>
        </div>
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "0 1.25rem 1.5rem",
          }}
          className="no-scrollbar"
        >
          {weather.daily.map((day, index) => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0.75rem 0",
                borderBottom: index < weather.daily.length - 1 ? "1px solid rgba(0, 0, 0, 0.1)" : "none",
              }}
              key={index}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  flex: 1,
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                  }}
                >
                  {weatherCodeToEmoji(day.icon)}
                </div>
                <div
                  style={{
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "#000",
                    }}
                  >
                    {getDayLabel(day.day, index)}
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    {formatDate(day.day)}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "rgba(0, 0, 0, 0.55)",
                      marginTop: "4px",
                    }}
                  >
                    {t.weather.sunrise} {formatSunTime(day.sunrise)}
                    {" ·"} {t.weather.sunset} {formatSunTime(day.sunset)}
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: 500,
                    color: "rgba(0, 0, 0, 0.5)",
                    minWidth: "32px",
                    textAlign: "right",
                  }}
                >
                  {day.low}°
                </div>
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "#000",
                    minWidth: "32px",
                    textAlign: "right",
                  }}
                >
                  {day.high}°
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

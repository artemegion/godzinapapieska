function getLastCharAsNum(str) {
    str = str.toString();
    return Number.parseInt(str[str.length - 1]);
}

function getLastChar(str) {
    str = str.toString();
    return str[str.length - 1];
}

function formatLabel(hours, minutes, seconds) {
    if (hours) {
        switch (getLastChar(hours)) {
            case 'a':
                return 'Pozostała';
            case 'y':
                return 'Pozostały';
            default:
                return 'Pozostało';
        }
    } else if (minutes) {
        switch (getLastChar(minutes)) {
            case 'a':
                return 'Pozostała';
            case 'y':
                return 'Pozostały';
            default:
                return 'Pozostało';
        }
    } else if (seconds) {
        switch (getLastChar(seconds)) {
            case 'a':
                return 'Pozostała';
            case 'y':
                return 'Pozostały';
            default:
                return 'Pozostało';
        }
    } else {
        return 'Pozostało'
    }
}

function formatHours(hours) {
    if (hours == 0)
        return '';

    let formatted = hours + ' ';

    if (hours < 10) {
        formatted += ['godzin', 'godzina', 'godziny', 'godziny', 'godziny', 'godzin', 'godzin', 'godzin', 'godzin', 'godzin'][getLastCharAsNum(hours)];
    } else if (hours < 20) {
        formatted += ['godzin', 'godzin', 'godzin', 'godzin', 'godzin', 'godzin', 'godzin', 'godzin', 'godzin', 'godzin'][getLastCharAsNum(hours)];
    } else {
        formatted += ['godzin', 'godzin', 'godziny', 'godziny', 'godziny'][getLastCharAsNum(hours)];
    }

    return formatted;
}

function formatMinutes(minutes) {
    if (minutes == 0)
        return '';

    let formatted = minutes + ' ';

    if (minutes < 10) {
        formatted += ['minut', 'minuta', 'minuty', 'minuty', 'minuty', 'minut', 'minut', 'minut', 'minut', 'minut'][getLastCharAsNum(minutes)];
    } else if (minutes < 20) {
        formatted += ['minut', 'minut', 'minut', 'minut', 'minut', 'minut', 'minut', 'minut', 'minut', 'minut'][getLastCharAsNum(minutes)];
    } else {
        formatted += ['minut', 'minut', 'minuty', 'minuty', 'minuty', 'minut', 'minut', 'minut', 'minut', 'minut'][getLastCharAsNum(minutes)];
    }

    return formatted;
}

function formatSeconds(seconds) {
    if (seconds == 0)
        return '';

    let formatted = seconds + ' ';

    if (seconds < 10) {
        formatted += ['sekund', 'sekunda', 'sekundy', 'sekundy', 'sekundy', 'sekund', 'sekund', 'sekund', 'sekund', 'sekund'][getLastCharAsNum(seconds)];
    } else if (seconds < 20) {
        formatted += ['sekund', 'sekund', 'sekund', 'sekund', 'sekund', 'sekund', 'sekund', 'sekund', 'sekund', 'sekund'][getLastCharAsNum(seconds)];
    } else {
        formatted += ['sekund', 'sekund', 'sekundy', 'sekundy', 'sekundy', 'sekund', 'sekund', 'sekund', 'sekund', 'sekund'][getLastCharAsNum(seconds)];
    }

    return formatted;
}

function wasTargetTimeReachedToday() {
    let now = new Date();
    return (now.getHours() >= 21 && now.getMinutes() >= 37) || now.getHours() > 21;
}

function calculateTargetDate() {
    let target;

    if (wasTargetTimeReachedToday()) {
        target = new Date(Date.now() + (24 * 60 * 60 * 1000));
    } else {
        target = new Date(Date.now());
    }

    target.setHours(21);
    target.setMinutes(37);
    target.setSeconds(0);
    target.setMilliseconds(0);

    return target;
}

function onUpdate() {
    const countdownElem = document.getElementById('countdown');
    // const imageContainerElem = document.getElementById('image-container');

    const target = calculateTargetDate();
    const timespan = countdown(new Date(), target);

    const formattedHours = formatHours(timespan.hours);
    const formattedMinutes = formatMinutes(timespan.minutes);
    const formattedSeconds = formatSeconds(timespan.seconds);

    let displayString = formatLabel(formattedHours, formattedMinutes, formattedSeconds) + ' ' + formattedHours + ' ' + (typeof timespan.minutes == 'number' ? formattedMinutes : '') + ' ' + (typeof timespan.seconds == 'number' ? formattedSeconds : '');

    const now = new Date();

    if (now.getHours() == 21 && now.getMinutes() == 37) {
        // imageContainerElem.classList.add('visible');
        countdownElem.innerText = '';
    }
    else {
        // imageContainerElem.classList.remove('visible');
        countdownElem.innerText = displayString;
    }
}

function getTheme() {
    return localStorage.getItem('theme') || 'light';
}

function setTheme(theme) {
    localStorage.setItem('theme', theme);
}

function setNextTheme() {
    let theme = getTheme();

    switch (theme) {
        case 'light':
            setTheme('dark');
            break;
        case 'dark':
            setTheme('light');
            break;
        default:
            setTheme('light');
            break;
    }
}

function applyCurrentThemeToBody() {
    document.body.setAttribute('theme', getTheme());
}

document.addEventListener('readystatechange', () => {

    if (document.readyState != 'complete')
        return;

    onUpdate();
    setInterval(onUpdate, 1000);

    applyCurrentThemeToBody();

    document.getElementById('theme-switch').addEventListener('click', () => {
        setNextTheme();
        applyCurrentThemeToBody();
    });
});
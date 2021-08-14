package pe.lacafetalab.pao.auth.user.domain;

import pe.lacafetalab.pao.shared.domain.bus.event.DomainEvent;
import java.io.Serializable;
import java.util.HashMap;
import java.util.Objects;

public final class UserHoliDomainEvent extends DomainEvent {
    private final String name;
    private final String lastname;
    private final String description;
    private final String birthdate;

    public UserHoliDomainEvent() {
        super(null);
        this.name = null;
        this.lastname = null;
        this.description = null;
        this.birthdate = null;
    }

    public UserHoliDomainEvent(String aggregateId, String name, String lastname, String description, String birthdate) {
        super(aggregateId);
        this.name = name;
        this.lastname = lastname;
        this.description = description;
        this.birthdate = birthdate;
    }

    public UserHoliDomainEvent(String aggregateId, String eventId, String occurredOn, String name, String lastname, String description, String birthdate) {
        super(aggregateId, eventId, occurredOn);
        this.name = name;
        this.lastname = lastname;
        this.description = description;
        this.birthdate = birthdate;
    }

    @Override
    public String eventName() {
        return "comunication.user.holi";
    }

    @Override
    public HashMap<String, Serializable> toPrimitives() {
        return new HashMap<String, Serializable>() {{
            put("name", name);
            put("lastname", lastname);
            put("description", description);
            put("birthdate", birthdate);
        }};
    }

    @Override
    public UserHoliDomainEvent fromPrimitives(String aggregateId, HashMap<String, Serializable> body, String eventId, String occurredOn) {
        return new UserHoliDomainEvent(aggregateId, eventId, occurredOn, (String) body.get("name"), (String) body.get("lastname"), (String) body.get("description"), (String) body.get("birthdate"));
    }

    public String name() {
        return name;
    }

    public String lastname() {
        return lastname;
    }

    public String description() {
        return description;
    }

    public String birthdate() {
        return birthdate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserHoliDomainEvent)) return false;
        UserHoliDomainEvent that = (UserHoliDomainEvent) o;
        return Objects.equals(name, that.name) && Objects.equals(lastname, that.lastname) && Objects.equals(description, that.description) && Objects.equals(birthdate, that.birthdate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, lastname, description, birthdate);
    }
}

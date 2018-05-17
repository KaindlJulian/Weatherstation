import java.time.LocalDateTime;

public class main {
    public static void main(String[] args) {
        LocalDateTime d = LocalDateTime.now();
        System.out.println(d);
        d = d.plusHours(2);
        System.out.println(d);
    }
}

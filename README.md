# himawari

## Performance

> Apache Bench

```
./ab -n 20000 -c 20 http://192.168.1.248:8910/api/setting/?cat=档案库
```

Java: 1419.60 req/sec

Kotlin: 1264.92 req/sec

```
./ab -n 20000 -c 200 http://192.168.1.248:8910/api/setting/?cat=档案库
```

Java: 1912.01 req/sec

Kotlin: 1410.86 req/sec

```
./ab -n 100000 -c 2000 http://192.168.1.248:8910/api/setting/?cat=档案库
```

Java: 1656.67 req/sec

Kotlin: 1640.99 req/sec
